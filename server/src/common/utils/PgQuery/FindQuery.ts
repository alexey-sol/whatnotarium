import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class FindQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        queryName = "find"
    ) {
        super(tableName, undefined, queryName);
    }

    async query (): DbAsyncQueryPayload<Type> | never {
        return this.sendQueryAndGetPayload({
            name: this.queryName,
            text: this.getText()
        });
    }

    private getText (): string {
        return `
            SELECT *
            FROM ${this.tableName}
            ORDER BY id ASC;
        `;
    }
}

export default FindQuery;
