import { FindAll } from "#utils/sql/ModelSqlGenerator";
import DbQueryFilter from "#types/DbQueryFilter";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findAllRecords<InputType, OutputType> (
    tableName: string,
    filter?: DbQueryFilter<InputType>,
    fieldsToSelect?: string[]
): Promise<OutputType[]> | never {
    type FilterType = DbQueryFilter<InputType>;

    const queryPayload = await generateSqlAndQuery<FilterType, OutputType>(
        new FindAll(tableName),
        filter,
        fieldsToSelect
    );

    return queryPayload;
}

export default findAllRecords;
