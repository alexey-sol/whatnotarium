import { CONFIRM_TOKEN, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateConfirmTokenTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${CONFIRM_TOKEN}" (
                "id" SERIAL PRIMARY KEY,
                "token" VARCHAR(255),
                "expirationDate" TIMESTAMP DEFAULT NOW() + INTERVAL '24 hour' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_ct_token ON "${CONFIRM_TOKEN}" ("token");
        `;
    }
}

export default CreateConfirmTokenTable;
