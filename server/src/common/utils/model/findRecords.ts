import { Find } from "utils/CrudSql";
import Indexer from "types/Indexer";
import PgQuery from "utils/PgQuery";

async function findRecords<OutputType> (
    tableName: string,
    filter?: Indexer<unknown>
): Promise<OutputType[]> | never {
    const pgQuery = new PgQuery<OutputType>();

    const sql = new Find(tableName)
        .generate(filter);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload;
}

export default findRecords;
