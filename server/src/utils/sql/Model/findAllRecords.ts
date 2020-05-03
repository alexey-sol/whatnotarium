import { FindAll } from "#utils/sql/ModelSqlGenerator";
import DbQueryFilter from "#types/DbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findAllRecords<Props, OutputType> (
    tableName: string,
    filter?: DbQueryFilter<Props>
): Promise<OutputType[]> | never {
    type FilterType = DbQueryFilter<Props>;

    const queryPayload = await generateSqlAndQuery<FilterType, OutputType>(
        new FindAll(tableName),
        filter
    );

    return queryPayload;
}

export default findAllRecords;
