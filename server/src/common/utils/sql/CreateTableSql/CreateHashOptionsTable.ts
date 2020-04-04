import { HASH_OPTIONS, USERS } from "const/dbTableNames";
import Sql from "types/Sql";
import SqlQueryPayload from "types/SqlQueryPayload";
import generateId from "utils/helpers/generateId";

class CreateHashOptionsTable implements Sql {
    constructor (
        private readonly queryName = generateId()
    ) {
        this.queryName = queryName;
    }

    generate (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    private getText (): string {
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
