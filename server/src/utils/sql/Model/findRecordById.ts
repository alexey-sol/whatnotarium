import { FindById } from "#utils/sql/CrudSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findRecordById<OutputType> (
    tableName: string,
    id: number
): Promise<OutputType | null> | never {
    const queryPayload = await generateSqlAndQuery<unknown, OutputType>(
        new FindById(tableName, id)
    );

    return queryPayload[0] || null;
}

export default findRecordById;
