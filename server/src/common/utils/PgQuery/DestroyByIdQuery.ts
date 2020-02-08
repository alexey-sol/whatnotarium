import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class DestroyByIdQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        recordId: string,
        queryName: string = "destroy-by-id"
    ) {
        super(tableName, recordId, queryName);
    }

    async query (): DbAsyncQueryPayload<Type> | never {
        try {
            return await this.sendQueryAndGetPayload({
                name: this.queryName,
                text: this.getText(),
                values: this.getValues()
            });
        } catch (error) {
            throw error;
        }
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
