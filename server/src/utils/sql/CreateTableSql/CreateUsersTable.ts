import { USERS } from "#utils/const/dbTableNames";
import SqlGenerator from "#types/SqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class CreateUsersTable implements SqlGenerator<unknown> {
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
                name VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW() NOT NULL,
                updated_at TIMESTAMP DEFAULT NOW() NOT NULL
            );
        `;
    }
}

export default CreateUsersTable;
