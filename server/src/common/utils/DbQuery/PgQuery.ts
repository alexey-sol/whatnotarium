import { QueryResult } from "pg";
import ArrayIndexer from "types/ArrayIndexer";
import DbQuery from "types/DbQuery";
import ModelProps from "types/ModelProps";
import ObjectIndexer from "types/ObjectIndexer";
import DbAsyncQueryPayload from "types/DbAsyncQueryPayload";
import PgQueryOptions from "types/PgQueryOptions";
import app from "app";

abstract class PgQuery<Type> implements DbQuery<Type> {
    protected offset = 0;

    constructor (
        protected tableName: string,
        protected recordId?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
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

    protected getPayload (
        queryResult: QueryResult
    ): Type & Type[] {
        const { rows } = queryResult;
        const hasSingleItem = rows.length === 1;

        return (hasSingleItem)
            ? rows[0]
            : rows;
    }

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

    abstract async query (
        queryName: string,
        props?: ModelProps
    ): DbAsyncQueryPayload<Type> | never;
}

export default PgQuery;
