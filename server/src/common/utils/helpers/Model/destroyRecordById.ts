import { DestroyById } from "utils/sql/CrudSql";
import PgQuery from "utils/sql/PgQuery";

async function destroyRecordById<OutputType> (
    tableName: string,
    id: number
): Promise<boolean> | never {
    const pgQuery = new PgQuery<OutputType>();

    const sql = new DestroyById(tableName, id)
        .generate();
    const queryPayload = await pgQuery
        .query(sql);

    const deletedRecord = queryPayload[0];
    const isSuccess = Boolean((deletedRecord as any)?.id);

    return isSuccess;
}

export default destroyRecordById;
