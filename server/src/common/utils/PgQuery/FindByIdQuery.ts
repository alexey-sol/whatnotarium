import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class FindByIdQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        recordId: string,
        queryName = "find-by-id"
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
            SELECT *
            FROM ${this.tableName}
            WHERE id = $1;
        `;
    }
}

export default FindByIdQuery;
