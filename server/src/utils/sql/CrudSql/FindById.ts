import CrudSql from "./CrudSql";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class FindById extends CrudSql<unknown> {
    constructor (
        tableName: string,
        recordId: number,
        queryName = generateId()
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
