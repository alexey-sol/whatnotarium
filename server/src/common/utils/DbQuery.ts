import { QueryResult } from "pg";
import DbPropsNormalizer from "types/DbPropsNormalizer";
import SqlQueryPayload from "types/SqlQueryPayload";
import app from "app";

class DbQuery<Type> {
    private readonly pgPool = app.get("pgPool");

    constructor (
        private readonly dbPropsNormalizer?: DbPropsNormalizer
    ) {
        this.dbPropsNormalizer = dbPropsNormalizer;
    }

    async query (
        sqlQueryPayload: SqlQueryPayload
    ): Promise<Type[]> | never {
        const input = this.normalizeInputIfNeeded(sqlQueryPayload);
        const queryResult = await this.pgPool.query(input);

        return this.getPayload(queryResult);
    }

    private normalizeInputIfNeeded (
        sqlQueryPayload: SqlQueryPayload
    ): unknown {
        return (this.dbPropsNormalizer)
            ? this.dbPropsNormalizer.normalizeInput(sqlQueryPayload)
            : sqlQueryPayload;
    }

    private getPayload (
        queryResult: QueryResult<Type>
    ): Type[] {
        const { rows } = queryResult;
        return this.normalizeOutputIfNeeded(rows) as Type[];
    }

    private normalizeOutputIfNeeded (rows: Type[]): unknown {
        if (!this.dbPropsNormalizer) {
            return rows;
        }

        return rows.map(record => {
            return this.dbPropsNormalizer!.normalizeOutput(record);
        });
    }
}

export default DbQuery;
