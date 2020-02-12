import { QueryResult } from "pg";
import SqlQueryPayload from "types/SqlQueryPayload";
import SqlResultPayload from "types/SqlResultPayload";
import app from "app";

class DbQuery<Type> {
    private pgPool = app.get("pgPool");

    async query (
        sqlQueryPayload: SqlQueryPayload
    ): SqlResultPayload<Type> | never {
        return this.sendQueryAndGetResult(sqlQueryPayload);
    }

    private async sendQueryAndGetResult (
        sqlQueryPayload: SqlQueryPayload
    ): SqlResultPayload<Type> | never {
        const queryResult = await this.pgPool.query(sqlQueryPayload);
        return this.getPayload(queryResult);
    }

    private getPayload (
        queryResult: QueryResult
    ): Type & Type[] {
        const { rows } = queryResult;
        const hasSingleItem = rows.length === 1;

        return (hasSingleItem)
            ? rows[0]
            : rows;
    }
}

export default DbQuery;
