import { Create } from "#utils/sql/CrudSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function createRecord<InputType, OutputType> (
    tableName: string,
    props: InputType
): Promise<OutputType> | never {
    const queryPayload = await generateSqlAndQuery<InputType, OutputType>(
        new Create(tableName),
        props
    );

    return queryPayload[0];
}

export default createRecord;
