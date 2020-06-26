import ModelSqlGenerator from "./ModelSqlGenerator";
import SqlQueryPayload from "#types/SqlQueryPayload";
import generateId from "#utils/helpers/generateId";

class FindById extends ModelSqlGenerator<unknown> {
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
            SELECT *
            FROM "${this.tableName}"
            WHERE id = $1;
        `;
    }
}

export default FindById;
