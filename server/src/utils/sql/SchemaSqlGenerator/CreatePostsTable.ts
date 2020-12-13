import { POSTS, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POSTS}" (
                "id" SERIAL PRIMARY KEY,
                "body" TEXT,
                "title" VARCHAR(255),
                "rating" INTEGER DEFAULT 0 NOT NULL,
                "userIdsVotedUp" INTEGER[] DEFAULT '{}' NOT NULL,
                "userIdsVotedDown" INTEGER[] DEFAULT '{}' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );
        `;
    }
}

export default CreateHashOptionsTable;
