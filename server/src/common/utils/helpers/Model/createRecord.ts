import { NO_PROPS } from "const/validationErrors";
import { Create } from "utils/sql/CrudSql";
import PgQuery from "utils/sql/PgQuery";
import ValidationError from "errors/ValidationError";
import isEmptyObject from "utils/helpers/isEmptyObject";
import isObject from "utils/typeGuards/isObject";

async function createRecord<InputType, OutputType> (
    tableName: string,
    props: InputType
): Promise<OutputType> | never {
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
