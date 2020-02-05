import { QueryResult } from "pg";

import app from "app";

type MakeDbQuery = (
    name: string,
    text: string,
    values?: any[]
) => Promise<QueryResult>;

const makeDbQuery: MakeDbQuery = async function (
    name: string,
    text: string,
    values?: any[]
): Promise<QueryResult> {
    const pgPool = app.get("pgPool");
    return await pgPool.query({
        name,
        text,
        values
    });
}

export default makeDbQuery;
