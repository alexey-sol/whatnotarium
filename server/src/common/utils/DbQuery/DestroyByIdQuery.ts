import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class DestroyByIdQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        recordId: string
    ) {
        super(tableName, recordId);
    }

    private getText (): string {
        return `
            DELETE FROM ${this.tableName}
            WHERE id = $1
            RETURNING *;
        `;
    }

    async query (
        queryName: string
    ): DbAsyncQueryPayload<Type> | never {
        try {
            return await this.sendQueryAndGetPayload({
                name: queryName,
                text: this.getText(),
                values: this.getValues()
            });
        } catch (error) {
            throw error;
        }
    }
}

export default DestroyByIdQuery;
