import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQuery from "./PgQuery";

class FindQuery<Type> extends PgQuery<Type> {
    constructor (tableName: string) {
        super(tableName);
    }

    private getText (): string {
        return `
            SELECT *
            FROM ${this.tableName}
            ORDER BY id ASC;
        `;
    }

    async query (
        queryName: string
    ): DbAsyncQueryPayload<Type> | never {
        try {
            return await this.sendQueryAndGetPayload({
                name: queryName,
                text: this.getText()
            });
        } catch (error) {
            throw error;
        }
    }
}

export default FindQuery;
