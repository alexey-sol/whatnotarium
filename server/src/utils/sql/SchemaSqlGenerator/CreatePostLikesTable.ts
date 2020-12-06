import {
    POST_LIKES,
    POSTS,
    PROFILES,
    USERS
} from "#utils/const/database/tableNames";

import SchemaSqlGenerator from "./SchemaSqlGenerator";
import { PUBLIC } from "#utils/const/database/schemaNames";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POST_LIKES}" (
                "id" SERIAL PRIMARY KEY,
                "count" INTEGER DEFAULT 0,
                "postId" INTEGER NOT NULL
                    REFERENCES "${POSTS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE OR REPLACE FUNCTION update_total_like_count()
            RETURNS TRIGGER AS $$
            DECLARE "newTotalLikeCount" INTEGER;
            BEGIN
                SELECT SUM(pl."count")
                FROM "${POST_LIKES}" AS pl
                WHERE pl."userId" = COALESCE(new."userId", old."userId")
                INTO "newTotalLikeCount";

                UPDATE "${PROFILES}" SET "totalLikeCount" = "newTotalLikeCount"
                WHERE "userId" = COALESCE(new."userId", old."userId");
                RETURN new;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_update_total_like_count ON "${POST_LIKES}";

            CREATE TRIGGER trigger_update_total_like_count
            AFTER INSERT OR UPDATE OR DELETE ON "${POST_LIKES}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_total_like_count();
        `;
    }
}

export default CreateHashOptionsTable;

// TODO: postLikes is an array of objects {count: 0, userId: 1}


// CREATE OR REPLACE FUNCTION create_post_likes()
// RETURNS TRIGGER AS $$
// BEGIN
// INSERT INTO "${POST_LIKES}" (
//     "postId",
//     "userId"
// )
// VALUES (
//     new."id",
//     new."userId"
// );
//
// RETURN new;
// END;
// $$ LANGUAGE plpgsql;
//
// DROP TRIGGER IF EXISTS trigger_create_post_likes ON "${POSTS}";
//
// CREATE TRIGGER trigger_create_post_likes
// AFTER INSERT ON "${POSTS}"
// FOR EACH ROW
// EXECUTE PROCEDURE create_post_likes();