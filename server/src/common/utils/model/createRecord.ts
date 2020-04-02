import { NO_PROPS } from "@const/validationErrors";
import { Create } from "@common/utils/CrudSql";
import PgQuery from "@common/utils/helpers/PgQuery";
import ValidationError from "@common/errors/ValidationError";
import isEmptyObject from "@common/utils/helpers/isEmptyObject";
import isObject from "@common/utils/typeGuards/isObject";

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
