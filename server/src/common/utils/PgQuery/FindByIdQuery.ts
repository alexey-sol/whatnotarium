import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class FindByIdQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        recordId: string,
        queryName: string = "find-by-id"
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
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1;
        `;
    }
}

export default FindByIdQuery;
