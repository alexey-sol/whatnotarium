import PgQuery from "#utils/sql/PgQuery";
import SqlGenerator from "#types/SqlGenerator";

async function generateSqlAndQuery<InputType, OutputType> (
    sqlGenerator: SqlGenerator<InputType>,
    props?: InputType
): Promise<OutputType[]> | never {
    const sql = sqlGenerator.generate(props);

    return new PgQuery<OutputType>()
        .query(sql);
}

export default generateSqlAndQuery;
