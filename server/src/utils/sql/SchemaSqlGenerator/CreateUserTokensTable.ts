import { USER_TOKENS, USER_TOKEN_TYPES, USERS } from "#utils/const/database/tableNames";
import { PUBLIC } from "#utils/const/database/schemaNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUserTokensTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${USER_TOKENS}" (
                "id" SERIAL PRIMARY KEY,
                "token" VARCHAR(255),
                "expirationDate" TIMESTAMP DEFAULT NOW() + INTERVAL '24 hour' NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "typeId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USER_TOKEN_TYPES}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE,
                "userId" INTEGER UNIQUE NOT NULL
                    REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
            );

            CREATE INDEX IF NOT EXISTS idx_ut_token ON "${USER_TOKENS}" ("token");
            CREATE INDEX IF NOT EXISTS idx_ut_user_type_ids ON "${USER_TOKENS}"
                ("typeId", "userId");
        `;
    }
}

export default CreateUserTokensTable;
