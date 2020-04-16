import { DestroyById } from "#utils/sql/CrudSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function destroyRecordById<OutputType> (
    tableName: string,
    id: number
): Promise<boolean> | never {
    const queryPayload = await generateSqlAndQuery<unknown, OutputType>(
        new DestroyById(tableName, id)
    );

    const deletedRecord = queryPayload[0];
    const isSuccess = Boolean((deletedRecord as any)?.id);

    return isSuccess;
}

export default destroyRecordById;
