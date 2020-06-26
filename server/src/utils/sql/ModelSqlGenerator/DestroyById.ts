import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class DestroyById extends ModelSqlGenerator<unknown> {
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

    protected getText (): string {
        return `
            DELETE FROM "${this.tableName}"
            WHERE id = $1
            RETURNING *;
        `;
    }
}

export default DestroyById;
