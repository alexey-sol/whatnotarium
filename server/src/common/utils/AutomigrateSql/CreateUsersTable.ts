import Sql from "types/Sql";
import SqlQueryPayload from "types/SqlQueryPayload";

class CreateUsersTable implements Sql {
    private readonly tableName = "users";

    constructor (
        private readonly queryName = "create-users-table"
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
            CREATE TABLE IF NOT EXISTS ${this.tableName} (
                id SERIAL PRIMARY KEY,
                email VARCHAR(255) UNIQUE NOT NULL,
                password BYTEA NOT NULL,
                hash_options_id INTEGER REFERENCES hash_options(id),
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `;
    }
}

export default CreateUsersTable;
