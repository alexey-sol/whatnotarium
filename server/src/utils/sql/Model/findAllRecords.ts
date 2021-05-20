import { FindAll } from "#utils/sql/ModelSqlGenerator";
import DbQueryFilter from "#types/DbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findAllRecords<InputType, OutputType> (
    tableName: string,
    filter?: DbQueryFilter<InputType>,
    fieldsToSelect?: string[],
    queryName?: string
): Promise<OutputType[]> | never {
    type FilterType = DbQueryFilter<InputType>;

    return generateSqlAndQuery<FilterType, OutputType>(
        new FindAll(tableName, queryName),
        filter,
        fieldsToSelect
    );
}

export default findAllRecords;
