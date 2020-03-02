import { NO_PROPS } from "constants/validationErrors";
import { UpdateAttributes } from "utils/CrudSql";
import PgQuery from "utils/PgQuery";
import ValidationError from "utils/errors/ValidationError";
import isEmptyObject from "utils/isEmptyObject";
import isObject from "utils/isObject";

async function updateRecordAttributes<InputType, OutputType> (
    tableName: string,
    id: number,
    props: InputType
): Promise<OutputType> | never {
    if (!isObject(props) || isEmptyObject(props)) {
        throw new ValidationError(NO_PROPS, 400);
    }

    const pgQuery = new PgQuery<OutputType>();

    const sql = new UpdateAttributes(tableName, id)
        .generate(props);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload[0];
}

export default updateRecordAttributes;
