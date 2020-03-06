import { NO_PROPS } from "constants/validationErrors";
import { Create } from "utils/CrudSql";
import PgQuery from "utils/PgQuery";
import ValidationError from "utils/errors/ValidationError";
import isEmptyObject from "utils/Object/isEmptyObject";
import isObject from "utils/Object/isObject";

async function createRecord<InputType, OutputType> (
    tableName: string,
    props: InputType
): Promise<OutputType | null> | never {
    if (!isObject(props) || isEmptyObject(props)) {
        throw new ValidationError(NO_PROPS, 400);
    }

    const pgQuery = new PgQuery<OutputType>();

    const sql = new Create(tableName)
        .generate(props);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload[0];
}

export default createRecord;
