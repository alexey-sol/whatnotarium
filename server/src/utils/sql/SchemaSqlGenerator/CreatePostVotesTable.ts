import {
    POST_VOTES,
    POSTS,
    PROFILES,
    USERS
} from "#utils/const/database/tableNames";

import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreatePostVotesTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POST_VOTES}" (
                "id" SERIAL PRIMARY KEY,
                "postId" INTEGER NOT NULL
                    REFERENCES "${POSTS}"
                    ON DELETE CASCADE,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}"
                    ON DELETE CASCADE,
                "value" SMALLINT NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL
            );

            CREATE INDEX ON "${POST_VOTES}" ("postId");
            CREATE INDEX ON "${POST_VOTES}" ("userId");
            CREATE INDEX ON "${POST_VOTES}" ("postId", "userId");

            CREATE OR REPLACE FUNCTION abort_if_post_vote_exists()
            RETURNS TRIGGER AS $$
            DECLARE vote_id INTEGER; own_post_id INTEGER;
            BEGIN
                SELECT "id" INTO vote_id
                FROM "${POST_VOTES}"
                WHERE
                    "postId" = COALESCE(new."postId", old."postId") AND
                    "userId" = COALESCE(new."userId", old."userId");

                IF (vote_id IS NULL) THEN
                    RETURN new;
                ELSE
                    RAISE EXCEPTION 'The user already voted for the post';
                END IF;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_abort_if_post_vote_exists ON "${POST_VOTES}";

            CREATE TRIGGER trigger_abort_if_post_vote_exists
            BEFORE INSERT ON "${POST_VOTES}"
            FOR EACH ROW
            EXECUTE PROCEDURE abort_if_post_vote_exists();

            CREATE OR REPLACE FUNCTION update_total_vote_count()
            RETURNS TRIGGER AS $$
            DECLARE new_total_vote_count INTEGER;
            BEGIN
                SELECT INTO new_total_vote_count COUNT(*)
                FROM "${POST_VOTES}"
                WHERE "userId" = COALESCE(new."userId", old."userId");

                UPDATE "${PROFILES}" SET "totalVoteCount" = new_total_vote_count
                WHERE "userId" = COALESCE(new."userId", old."userId");

                RETURN new;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_update_total_vote_count ON "${POST_VOTES}";

            CREATE TRIGGER trigger_update_total_vote_count
            AFTER INSERT OR DELETE ON "${POST_VOTES}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_total_vote_count();

            CREATE OR REPLACE FUNCTION append_user_id_to_voted_array(
                _is_positive BOOLEAN,
                _post_id INTEGER,
                _user_id INTEGER
            )
            RETURNS VOID AS $$
            BEGIN
                IF (_is_positive) THEN
                    UPDATE "${POSTS}"
                    SET "userIdsVotedUp" = array_append("userIdsVotedUp", _user_id)
                    WHERE "id" = _post_id;
                ELSE
                    UPDATE "${POSTS}"
                    SET "userIdsVotedDown" = array_append("userIdsVotedDown", _user_id)
                    WHERE "id" = _post_id;
                END IF;
            END;
            $$ LANGUAGE plpgsql;

            CREATE OR REPLACE FUNCTION remove_user_id_from_voted_array(
                _is_positive BOOLEAN,
                _post_id INTEGER,
                _user_id INTEGER
            )
            RETURNS VOID AS $$
            BEGIN
                IF (_is_positive) THEN
                    UPDATE "${POSTS}"
                    SET "userIdsVotedUp" = array_remove("userIdsVotedUp", _user_id)
                    WHERE "id" = _post_id;
                ELSE
                    UPDATE "${POSTS}"
                    SET "userIdsVotedDown" = array_remove("userIdsVotedDown", _user_id)
                    WHERE "id" = _post_id;
                END IF;
            END;
            $$ LANGUAGE plpgsql;

            CREATE OR REPLACE FUNCTION update_voted_user_ids_and_rating()
            RETURNS TRIGGER AS $$
            DECLARE new_rating INTEGER; post_id INTEGER; user_id INTEGER; should_append_id BOOLEAN;
            BEGIN
                SELECT INTO new_rating SUM("value")
                FROM "${POST_VOTES}"
                WHERE "postId" = COALESCE(new."postId", old."postId");

                UPDATE "${POSTS}" SET "rating" = COALESCE(new_rating, 0)
                WHERE "id" = COALESCE(new."postId", old."postId");

                post_id := COALESCE(new."postId", old."postId");
                user_id := COALESCE(new."userId", old."userId");

                IF (TG_OP = 'INSERT') THEN
                   PERFORM append_user_id_to_voted_array(new."value" > 0, post_id, user_id);
                ELSIF (TG_OP = 'DELETE') THEN
                    PERFORM remove_user_id_from_voted_array(old."value" > 0, post_id, user_id);
                END IF;

                RETURN new;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_update_voted_user_ids_and_rating ON "${POST_VOTES}";

            CREATE TRIGGER trigger_update_voted_user_ids_and_rating
            AFTER INSERT OR DELETE ON "${POST_VOTES}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_voted_user_ids_and_rating();
        `;
    }
}

export default CreatePostVotesTable;
