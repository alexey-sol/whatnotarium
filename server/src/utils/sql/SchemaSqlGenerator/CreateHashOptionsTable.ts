import { HASH_OPTIONS, USERS } from "#utils/const/dbTableNames";
import SchemaSqlGenerator from "./SchemaSqlGenerator";

class CreateHashOptionsTable extends SchemaSqlGenerator<unknown> {
    protected getText (): string {
        return `
            CREATE TABLE IF NOT EXISTS ${HASH_OPTIONS} (
                id SERIAL PRIMARY KEY,
                salt VARCHAR(255) NOT NULL,
                digest VARCHAR(255) NOT NULL,
                iterations INTEGER NOT NULL,
                key_length INTEGER NOT NULL,
                user_id INTEGER NOT NULL REFERENCES ${USERS} (id)
                    ON DELETE CASCADE
            );
        `;
    }
}

export default CreateHashOptionsTable;
