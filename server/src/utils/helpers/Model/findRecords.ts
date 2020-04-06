import { Find } from "#utils/sql/CrudSql";
import { INVALID_FILTER } from "#utils/const/validationErrors";
import PgQuery from "#utils/sql/PgQuery";
import isObject from "#utils/typeGuards/isObject";
import ModelError from "#utils/errors/ModelError";

async function findRecords<FilterType, OutputType> (
    tableName: string,
    filter?: FilterType
): Promise<OutputType[]> | never {
    if (!isObject(filter)) {
        throw new ModelError(INVALID_FILTER, 400);
    }

    const pgQuery = new PgQuery<OutputType>();

    const sql = new Find(tableName)
        .generate(filter);
    const queryPayload = await pgQuery
        .query(sql);

    return queryPayload;
}

export default findRecords;
