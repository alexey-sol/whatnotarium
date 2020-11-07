import PgQuery from "#utils/sql/PgQuery";
import SqlGenerator from "#types/SqlGenerator";

async function generateSqlAndQuery<InputType, OutputType> (
    sqlGenerator: SqlGenerator<InputType>,
    input?: InputType,
    returningFields?: string[]
): Promise<OutputType[]> | never {
    const sql = sqlGenerator.generate(input, returningFields);

    return new PgQuery<OutputType>()
        .query(sql);
}

export default generateSqlAndQuery;
