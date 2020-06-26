import { PROFILES, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUsersTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS "${PROFILES}" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(255) NOT NULL,
                "picture" BYTEA,
                "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "updatedAt" TIMESTAMP DEFAULT NOW() NOT NULL,
                "userId" INTEGER UNIQUE NOT NULL REFERENCES "${USERS}" ("id")
                    ON DELETE CASCADE
            );
        `;
    }
}

export default CreateUsersTable;
