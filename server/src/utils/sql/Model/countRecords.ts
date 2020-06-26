import { Count } from "#utils/sql/ModelSqlGenerator";
import DbQueryFilter from "#types/DbQueryFilter";
import SqlQueryCountResult from "#types/SqlQueryCountResult";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function countRecords<InputType> (
    tableName: string,
    filter?: DbQueryFilter<InputType>
): Promise<number> | never {
    type FilterType = DbQueryFilter<InputType>;

    const queryPayload = await generateSqlAndQuery<FilterType, SqlQueryCountResult>(
        new Count(tableName),
        filter
    );

    return +queryPayload[0].count;
}

export default countRecords;
