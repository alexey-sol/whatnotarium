import { FindById } from "@common/utils/CrudSql";
import PgQuery from "@common/utils/helpers/PgQuery";

async function findRecordById<OutputType> (
    tableName: string,
    id: number
): Promise<OutputType | null> | never {
    const pgQuery = new PgQuery<OutputType>();

    const sql = new FindById(tableName, id)
        .generate();
    const queryPayload = await pgQuery
        .query(sql);

    if (queryPayload.length === 0) {
        return null;
    }

    return queryPayload[0];
}

export default findRecordById;
