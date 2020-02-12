import Sql from "./Sql";
import SqlQueryPayload from "types/SqlQueryPayload";

class FindById extends Sql {
    constructor (
        tableName: string,
        recordId: string,
        queryName = "find-by-id"
    ) {
        super(tableName, recordId, queryName);
    }

    generate (): SqlQueryPayload {
        return {
            name: this.queryName,
            text: this.getText(),
            values: this.getValues()
        };
    }

    private getText (): string {
        return `
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1;
        `;
    }
}

export default FindById;
