import PgQuery from "#utils/sql/PgQuery";
import SqlGenerator from "#types/SqlGenerator";

async function generateSqlAndQuery<InputType, OutputType> (
    sqlGenerator: SqlGenerator<InputType>,
    input?: InputType
): Promise<OutputType[]> | never {
    const sql = sqlGenerator.generate(input);

    return new PgQuery<OutputType>()
        .query(sql);
}

export default generateSqlAndQuery;
