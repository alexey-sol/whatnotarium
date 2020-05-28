import { POSTS, USERS } from "#utils/const/database/tableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS ${POSTS} (
                body TEXT,
                id SERIAL PRIMARY KEY,
                title VARCHAR(255),
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL,
                user_id INTEGER NOT NULL REFERENCES ${USERS} (id)
                    ON DELETE CASCADE
            );
        `;
    }
}

export default CreateHashOptionsTable;
