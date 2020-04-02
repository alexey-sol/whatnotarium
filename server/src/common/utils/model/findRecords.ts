import { Find } from "@common/utils/CrudSql";
import Indexer from "@common/types/Indexer";
import PgQuery from "@common/utils/helpers/PgQuery";

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
