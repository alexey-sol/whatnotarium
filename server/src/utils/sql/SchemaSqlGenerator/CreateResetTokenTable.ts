import { PUBLIC } from "#utils/const/database/schemaNames";
import { RESET_TOKEN, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateResetTokenTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${RESET_TOKEN}" (
                "id" SERIAL PRIMARY KEY,
                "token" VARCHAR(255),
                "expirationDate" TIMESTAMP DEFAULT NOW() + INTERVAL '2 hour' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_rt_token ON "${RESET_TOKEN}" ("token");
        `;
    }
}

export default CreateResetTokenTable;
