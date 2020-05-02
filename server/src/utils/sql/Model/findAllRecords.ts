import { FindAll } from "#utils/sql/CrudSql";
import DbQueryFilter from "#types/DbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findAllRecords<WhereType, OutputType> (
    tableName: string,
    filter?: DbQueryFilter<WhereType>
): Promise<OutputType[]> | never {
    type FilterType = DbQueryFilter<WhereType>;

    const queryPayload = await generateSqlAndQuery<FilterType, OutputType>(
        new FindAll(tableName),
        filter
    );

    return queryPayload;
}

export default findAllRecords;
