import Sql from "types/Sql";
import SqlQueryPayload from "types/SqlQueryPayload";

class CreateHashOptionsTable implements Sql {
    private readonly tableName = "hash_options";

    constructor (
        private readonly queryName = "create-hash-options-table"
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
                salt VARCHAR(255) NOT NULL,
                iterations INTEGER NOT NULL,
                key_length INTEGER NOT NULL,
                digest VARCHAR(255) NOT NULL
            );
        `;
    }
}

export default CreateHashOptionsTable;
