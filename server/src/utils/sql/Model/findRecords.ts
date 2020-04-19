import { Find } from "#utils/sql/CrudSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findRecords<FilterType, OutputType> (
    tableName: string,
    filter?: FilterType
): Promise<OutputType[]> | never {
    const queryPayload = await generateSqlAndQuery<FilterType, OutputType>(
        new Find(tableName),
        filter
    );

    return queryPayload;
}

export default findRecords;
