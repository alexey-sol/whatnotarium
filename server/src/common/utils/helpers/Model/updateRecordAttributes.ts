import { NO_PROPS } from "const/validationErrors";
import { UpdateAttributes } from "utils/sql/CrudSql";
import PgQuery from "utils/sql/PgQuery";
import ValidationError from "errors/ValidationError";
import isEmptyObject from "utils/helpers/isEmptyObject";
import isObject from "utils/typeGuards/isObject";

async function updateRecordAttributes<InputType, OutputType> (
    tableName: string,
    id: number,
    props: InputType
): Promise<OutputType | null> | never {
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
