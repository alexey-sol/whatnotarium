import Sql from "./Sql";
import SqlQueryPayload from "types/SqlQueryPayload";

class Find extends Sql {
    constructor (
        tableName: string,
        queryName = "find"
    ) {
        super(tableName, undefined, queryName);
    }

    generate (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText()
        };
    }

    private getText (): string {
        return `
            SELECT *
            FROM ${this.tableName}
            ORDER BY id ASC;
        `;
    }
}

export default Find;
