import { DestroyAll } from "#utils/sql/ModelSqlGenerator";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";
import DbQueryFilter from "#types/DbQueryFilter";

async function destroyAllRecords<InputType, OutputType = unknown> (
    tableName: string,
    filter?: DbQueryFilter<InputType>
): Promise<number | null> | never {
    type FilterType = DbQueryFilter<InputType>;

    const queryPayload = await generateSqlAndQuery<FilterType, OutputType>(
        new DestroyAll(tableName),
        filter
    );

    const deletedRecord = queryPayload[0] as any;
    return deletedRecord?.id || null;
}

export default destroyAllRecords;
