import { POSTS, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC);
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POSTS}" (
                "id" SERIAL PRIMARY KEY,
                "body" TEXT NOT NULL,
                "excerpt" TEXT DEFAULT '',
                "title" VARCHAR(255) NOT NULL,
                "rating" INTEGER DEFAULT 0 NOT NULL,
                "userIdsVotedUp" INTEGER[] DEFAULT '{}' NOT NULL,
                "userIdsVotedDown" INTEGER[] DEFAULT '{}' NOT NULL,
                "isApproved" BOOLEAN DEFAULT FALSE NOT NULL,
                "isFrozen" BOOLEAN DEFAULT FALSE NOT NULL,
                "viewCount" INTEGER DEFAULT 0 NOT NULL CHECK ("viewCount" <= 2147483647),
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_posts_body ON "${POSTS}"
                USING gin ("body" gin_trgm_ops);
            CREATE INDEX IF NOT EXISTS idx_posts_title ON "${POSTS}"
                USING gin ("title" gin_trgm_ops);

            CREATE INDEX IF NOT EXISTS idx_posts_is_approved ON "${POSTS}" ("isApproved");
            CREATE INDEX IF NOT EXISTS idx_posts_user_id ON "${POSTS}" ("userId");
            CREATE INDEX IF NOT EXISTS idx_posts_user_approved ON "${POSTS}"
                ("userId", "isApproved");

            CREATE OR REPLACE FUNCTION cap_view_count()
            RETURNS TRIGGER AS $$
            DECLARE int_cap INTEGER;
            BEGIN
                int_cap := 2147483647;

                IF (new."viewCount" >= int_cap) THEN
                    new."viewCount" = int_cap;
                END IF;

                RETURN new;
            END;
            $$ LANGUAGE plpgsql;

            DROP TRIGGER IF EXISTS trigger_cap_view_count ON "${POSTS}";

            CREATE TRIGGER trigger_cap_view_count
            BEFORE INSERT OR UPDATE ON "${POSTS}"
            FOR EACH ROW
            EXECUTE PROCEDURE cap_view_count();
        `;
    }
}

export default CreateHashOptionsTable;
