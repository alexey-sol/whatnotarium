import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class FindQuery<Type> extends PgQuery<Type> {
    constructor (
        tableName: string,
        queryName: string = "find"
    ) {
        super(tableName, undefined, queryName);
    }

    async query (): DbAsyncQueryPayload<Type> | never {
        try {
            return await this.sendQueryAndGetPayload({
                name: this.queryName,
                text: this.getText()
            });
        } catch (error) {
            throw error;
        }
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
