import { Create } from "#utils/sql/CrudSql";
import { NO_PROPS } from "#utils/const/validationErrors";
import ModelError from "#utils/errors/ModelError";
import PgQuery from "#utils/sql/PgQuery";
import isEmptyObject from "#utils/helpers/isEmptyObject";
import isObject from "#utils/typeGuards/isObject";

async function createRecord<InputType, OutputType> (
    tableName: string,
    props: InputType
): Promise<OutputType> | never {
    if (!isObject(props) || isEmptyObject(props)) {
        throw new ModelError(NO_PROPS, 400);
    }

    const pgQuery = new PgQuery<OutputType>();

    const sql = new Create(tableName)
        .generate(props);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload[0];
}

export default createRecord;
