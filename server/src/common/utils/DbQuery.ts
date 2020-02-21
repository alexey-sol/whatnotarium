import { QueryResult } from "pg";
import SqlQueryPayload from "types/SqlQueryPayload";
import app from "app";

class DbQuery<Type> {
    private pgPool = app.get("pgPool");

    async query (
        sqlQueryPayload: SqlQueryPayload
    ): Promise<Type[]> | never {
        const queryResult = await this.pgPool.query(sqlQueryPayload);
        return this.getPayload(queryResult);
    }

    private getPayload (
        queryResult: QueryResult<Type>
    ): Type[] {
        return queryResult.rows;
    }
}

export default DbQuery;
