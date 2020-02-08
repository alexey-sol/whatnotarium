import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class DestroyByIdQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        recordId: string,
        queryName = "destroy-by-id"
    ) {
        super(tableName, recordId, queryName);
    }

    async query (): DbAsyncQueryPayload<Type> | never {
        return this.sendQueryAndGetPayload({
            name: this.queryName,
            text: this.getText(),
            values: this.getValues()
        });
    }

    private getText (): string {
        return `
            DELETE FROM ${this.tableName}
            WHERE id = $1
            RETURNING *;
        `;
    }
}

export default DestroyByIdQuery;
