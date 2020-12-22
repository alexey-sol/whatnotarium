import { POSTS, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${POSTS}" (
                "id" SERIAL PRIMARY KEY,
                "body" TEXT NOT NULL,
                "title" VARCHAR(255) NOT NULL,
                "rating" INTEGER DEFAULT 0 NOT NULL,
                "userIdsVotedUp" INTEGER[] DEFAULT '{}' NOT NULL,
                "userIdsVotedDown" INTEGER[] DEFAULT '{}' NOT NULL,
                "viewCount" INTEGER DEFAULT 0 NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX ON "${POSTS}" ("userId");
        `;
    }
}

export default CreateHashOptionsTable;
