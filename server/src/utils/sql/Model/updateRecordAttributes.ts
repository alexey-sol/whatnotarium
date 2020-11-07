import { UpdateAttributes } from "#utils/sql/ModelSqlGenerator";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function updateRecordAttributes<InputType, OutputType> (
    tableName: string,
    id: number,
    props: InputType,
    returningFields?: string[]
): Promise<OutputType | null> | never {
    const queryPayload = await generateSqlAndQuery<InputType, OutputType>(
        new UpdateAttributes(tableName, id),
        props,
        returningFields
    );

    return queryPayload[0];
}

export default updateRecordAttributes;
