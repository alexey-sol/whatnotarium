import { UpdateAttributes } from "#utils/sql/CrudSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function updateRecordAttributes<InputType, OutputType> (
    tableName: string,
    id: number,
    props: InputType
): Promise<OutputType> | never {
    const queryPayload = await generateSqlAndQuery<InputType, OutputType>(
        new UpdateAttributes(tableName, id),
        props
    );

    return queryPayload[0];
}

export default updateRecordAttributes;
