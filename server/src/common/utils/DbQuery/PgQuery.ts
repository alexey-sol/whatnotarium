import { QueryResult } from "pg";
import DbQuery from "types/DbQuery";
import ModelProps from "types/ModelProps";
import PgQueryOptions from "types/PgQueryOptions";
import app from "app";

abstract class PgQuery implements DbQuery {
    protected offset = 0;

    constructor (
        protected tableName: string,
        protected recordId?: string
    ) {
        this.tableName = tableName;
        this.offset = (recordId) ? 1 : 0;
    }

    protected isLastIteration (
        props: ModelProps,
        count: number
    ): boolean {
        return count === Object.keys(props).length + this.offset;
    }

    protected getValues (
        props: ModelProps
    ): string[] {
        const id = this.recordId;
        const values = Object.values(props);

        return (id)
            ? [id, ...values]
            : values;
    }

    protected async sendQuery (
        queryOptions: PgQueryOptions
    ): Promise<QueryResult> | never {
        const { name, text, values } = queryOptions;
        const pgPool = app.get("pgPool");

        try {
            const queryResult = await pgPool.query({
                name,
                text,
                values
            });

            return queryResult;
        } catch (error) {
            throw error;
        }
    }

    abstract async query (
        queryName: string,
        props: ModelProps
    ): Promise<QueryResult> | never;
}

export default PgQuery;
