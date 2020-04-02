import { HASH_OPTIONS, USERS } from "@const/dbTableNames";
import Sql from "@common/types/Sql";
import SqlQueryPayload from "@common/types/SqlQueryPayload";
import generateId from "@common/utils/helpers/generateId";

class CreateUserTable implements Sql {
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
            CREATE TABLE IF NOT EXISTS ${USERS} (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password BYTEA NOT NULL,
                hash_options_id INTEGER REFERENCES ${HASH_OPTIONS} (id),
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `;
    }
}

export default CreateUserTable;
