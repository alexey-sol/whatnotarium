import { POSTS, PROFILES, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";
import {PUBLIC} from "#utils/const/database/schemaNames";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POSTS}" (
                "id" SERIAL PRIMARY KEY,
                "body" TEXT,
                "likeCount" INTEGER DEFAULT 0,
                "title" VARCHAR(255),
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE OR REPLACE FUNCTION update_total_like_count()
            RETURNS TRIGGER AS $$
            DECLARE "newTotalLikeCount" INTEGER;
            BEGIN
                SELECT SUM(p."likeCount")
                FROM "${POSTS}" AS p
                WHERE p."userId" = COALESCE(new."userId", old."userId")
                INTO "newTotalLikeCount";

                UPDATE "${PROFILES}" SET "totalLikeCount" = "newTotalLikeCount"
                WHERE "userId" = COALESCE(new."userId", old."userId");
                RETURN new;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_update_total_like_count ON "${POSTS}";

            CREATE TRIGGER trigger_update_total_like_count
            AFTER INSERT OR UPDATE OR DELETE ON "${POSTS}"
            FOR EACH ROW
            EXECUTE PROCEDURE update_total_like_count();
        `;
    }
}

export default CreateHashOptionsTable;
