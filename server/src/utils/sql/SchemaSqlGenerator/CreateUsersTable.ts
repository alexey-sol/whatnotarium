import { PUBLIC } from "#utils/const/database/schemaNames";
import { USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUsersTable extends SchemaSqlGenerator<unknown> {
    constructor () {
        super(PUBLIC, "");
    }

    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${USERS}" (
                "id" SERIAL PRIMARY KEY,
                "email" VARCHAR(255) UNIQUE NOT NULL,
                "isAdmin" BOOLEAN DEFAULT FALSE NOT NULL,
                "isConfirmed" BOOLEAN DEFAULT FALSE NOT NULL,
                "isOauth" BOOLEAN DEFAULT FALSE NOT NULL,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL
            );

            CREATE INDEX IF NOT EXISTS idx_users_email ON "${USERS}" ("email");
            CREATE INDEX IF NOT EXISTS idx_users_is_admin ON "${USERS}" ("isAdmin");
        `;
    }
}

export default CreateUsersTable;
