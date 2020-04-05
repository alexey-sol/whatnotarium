import SqlQueryPayload from "./SqlQueryPayload";

interface DbQuery<Type> {
    query (
        sqlQueryPayload: SqlQueryPayload
    ): Promise<Type[]> | never;
}

export default DbQuery;
