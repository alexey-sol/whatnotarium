import { USER_PROFILES, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateUsersTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS ${USER_PROFILES} (
                id SERIAL PRIMARY KEY,
                avatar_url BYTEA,
                user_id INTEGER UNIQUE NOT NULL REFERENCES ${USERS} (id)
                    ON DELETE CASCADE
            );
        `;
    }
}

export default CreateUsersTable;
