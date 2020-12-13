import { FULL_USERS_VIEW } from "#utils/const/database/viewNames";
import { HASH_OPTIONS, PROFILES, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateFullUsersView extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE OR REPLACE VIEW "${FULL_USERS_VIEW}" AS
            SELECT
                u."id", u."email", u."createdAt", u."updatedAt", p."name", p."picture",
                p."totalVoteCount", p."lastActivityDate", ho."hash", ho."salt", ho."digest",
                ho."iterations", ho."keyLength"
            FROM "${USERS}" AS u
            INNER JOIN "${PROFILES}" AS p ON u."id" = p."userId"
            INNER JOIN "${HASH_OPTIONS}" AS ho ON u."id" = ho."userId";

            CREATE OR REPLACE FUNCTION update_full_users()
            RETURNS TRIGGER AS $$
            DECLARE new_user_id INTEGER; new_created_at TIMESTAMP; new_updated_at TIMESTAMP;
            BEGIN
                IF (TG_OP = 'INSERT') THEN
                    INSERT INTO "${USERS}" (
                        "email"
                    )
                    VALUES (
                        new."email"
                    )
                    RETURNING "id", "createdAt", "updatedAt"
                    INTO new_user_id, new_created_at, new_updated_at;

                    INSERT INTO "${PROFILES}" (
                        "name",
                        "picture",
                        "userId"
                    )
                    VALUES (
                        new."name",
                        new."picture",
                        new_user_id
                    );

                    INSERT INTO "${HASH_OPTIONS}" (
                        "hash",
                        "salt",
                        "digest",
                        "iterations",
                        "keyLength",
                        "userId"
                    )
                    VALUES (
                        new."hash",
                        new."salt",
                        new."digest",
                        new."iterations",
                        new."keyLength",
                        new_user_id
                    );

                    new."id" = new_user_id;
                    new."createdAt" = new_created_at;
                    new."updatedAt" = new_updated_at;

                    RETURN new;

                ELSIF (TG_OP = 'UPDATE') THEN
                    UPDATE "${USERS}" SET
                        "email" = COALESCE(new."email", old."email"),
                        "updatedAt" = NOW()
                    WHERE "id" = old."id" AND (
                        new."email" IS DISTINCT FROM old."email"
                    );

                    UPDATE "${PROFILES}" SET
                        "about" = COALESCE(new."about", old."about"),
                        "birthdate" = COALESCE(new."birthdate", old."birthdate"),
                        "name" = COALESCE(new."name", old."name"),
                        "picture" = new."picture",
                        "updatedAt" = NOW()
                    WHERE "id" = old."id" AND (
                        new."about" IS DISTINCT FROM old."about" OR
                        new."birthdate" IS DISTINCT FROM old."birthdate" OR
                        new."name" IS DISTINCT FROM old."name" OR
                        new."picture" IS DISTINCT FROM old."picture"
                    );

                    UPDATE "${HASH_OPTIONS}" SET
                        "hash" = new."hash",
                        "salt" = new."salt",
                        "digest" = new."digest",
                        "iterations" = new."iterations",
                        "keyLength" = new."keyLength",
                        "updatedAt" = NOW()
                    WHERE "id" = old."id" AND (
                        new."hash" IS DISTINCT FROM old."hash" OR
                        new."salt" IS DISTINCT FROM old."salt" OR
                        new."digest" IS DISTINCT FROM old."digest" OR
                        new."iterations" IS DISTINCT FROM old."iterations" OR
                        new."keyLength" IS DISTINCT FROM old."keyLength"
                    );

                    IF NOT FOUND THEN RETURN NULL; END IF;
                    RETURN new;
                END IF;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_update_full_users ON "${FULL_USERS_VIEW}";

            CREATE TRIGGER trigger_update_full_users
            INSTEAD OF INSERT OR UPDATE OR DELETE ON "${FULL_USERS_VIEW}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_full_users();
        `;
    }
}

export default CreateFullUsersView;
