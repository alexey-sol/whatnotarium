import CrudSql from "./CrudSql";
import SqlQueryPayload from "types/SqlQueryPayload";

class DestroyById extends CrudSql {
    constructor (
        tableName: string,
        recordId: string,
        queryName = "destroy-by-id"
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
            DELETE FROM ${this.tableName}
            WHERE id = $1
            RETURNING *;
        `;
    }
}

export default DestroyById;
