import { USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUsersTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS ${USERS} (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password BYTEA NOT NULL,
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
        `;
    }
}

export default CreateUsersTable;
