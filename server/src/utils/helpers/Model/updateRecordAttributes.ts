import { NO_PROPS } from "#utils/const/validationErrors";
import { UpdateAttributes } from "#utils/sql/CrudSql";
import ModelError from "#utils/errors/ModelError";
import PgQuery from "#utils/sql/PgQuery";
import isEmptyObject from "#utils/helpers/isEmptyObject";
import isObject from "#utils/typeGuards/isObject";

async function updateRecordAttributes<InputType, OutputType> (
    tableName: string,
    id: number,
    props: InputType
): Promise<OutputType> | never {
    if (!isObject(props) || isEmptyObject(props)) {
        throw new ModelError(NO_PROPS, 400);
    }

    const pgQuery = new PgQuery<OutputType>();

    const sql = new UpdateAttributes(tableName, id)
        .generate(props);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload[0];
}

export default updateRecordAttributes;
