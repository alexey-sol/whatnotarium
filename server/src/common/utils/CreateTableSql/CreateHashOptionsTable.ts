import { HASH_OPTIONS } from "@const/dbTableNames";
import Sql from "@common/types/Sql";
import SqlQueryPayload from "@common/types/SqlQueryPayload";
import generateId from "@common/utils/helpers/generateId";

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
                key_length INTEGER NOT NULL
            );
        `;
    }
}

export default CreateHashOptionsTable;
