import { FindById } from "#utils/sql/ModelSqlGenerator";
import Include from "#types/Include";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function findRecordById<OutputType> (
    tableName: string,
    id: number,
    include?: Include[]
): Promise<OutputType | null> | never {
    const queryPayload = await generateSqlAndQuery<unknown, OutputType>(
        new FindById(tableName, id),
        include
    );

    return queryPayload[0] || null;
}

export default findRecordById;
