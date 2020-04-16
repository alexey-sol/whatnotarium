import { Pool, QueryResult } from "pg";
import DbQuery from "#types/DbQuery";
import SqlQueryPayload from "#types/SqlQueryPayload";
import pool from "#connectionPool";

class PgQuery<Type> implements DbQuery<Type> {
    constructor (
        private readonly pg: Pool = pool
    ) {
        this.pg = pg;
    }

    async query (
        sqlQueryPayload: SqlQueryPayload
    ): Promise<Type[]> | never {
        const queryResult = await this.pg.query(sqlQueryPayload);
        return this.getPayload(queryResult);
    }

    private getPayload (
        queryResult: QueryResult<Type>
    ): Type[] {
        return queryResult.rows;
    }
}

export default PgQuery;
