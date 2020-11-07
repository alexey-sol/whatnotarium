import { Create } from "#utils/sql/ModelSqlGenerator";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function createRecord<InputType, OutputType> (
    tableName: string,
    props: InputType,
    returningFields?: string[]
): Promise<OutputType> | never {
    const queryPayload = await generateSqlAndQuery<InputType, OutputType>(
        new Create(tableName),
        props,
        returningFields
    );

    return queryPayload[0];
}

export default createRecord;
