import { QueryResult } from "pg";
import DbQuery from "types/DbQuery";
import SqlQueryPayload from "types/SqlQueryPayload";
import app from "config/app";

class PgQuery<Type> implements DbQuery<Type> {
    private readonly pgPool = app.get("pgPool");

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

export default PgQuery;
