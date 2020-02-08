import { QueryResult } from "pg";
import DbQuery from "types/DbQuery";
import ModelProps from "types/ModelProps";
import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQueryOptions from "types/PgQueryOptions";
import app from "app";

abstract class PgQuery<Type> implements DbQuery<Type> {
    protected offset: number;

    constructor (
        protected tableName: string,
        protected recordId?: string,
        protected queryName?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    abstract async query (
        props?: ModelProps
    ): DbAsyncQueryPayload<Type> | never;

    protected async sendQueryAndGetPayload (
        queryOptions: PgQueryOptions
    ): DbAsyncQueryPayload<Type> | never {
        const pgPool = app.get("pgPool");

        try {
            const queryResult = await pgPool.query(queryOptions);
            return this.getPayload(queryResult);
        } catch (error) {
            throw error;
        }
    }

    protected getPayload (
        queryResult: QueryResult
    ): Type & Type[] {
        const { rows } = queryResult;
        const hasSingleItem = rows.length === 1;

        return (hasSingleItem)
            ? rows[0]
            : rows;
    }

    protected getValues (
        props: ModelProps = []
    ): string[] {
        const id = this.recordId;
        const values = Object.values(props);

        return (id)
            ? [id, ...values]
            : values;
    }
}

export default PgQuery;
