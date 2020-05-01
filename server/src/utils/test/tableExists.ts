import { TableExists } from "#utils/sql/ManageDatabaseSql";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

const PUBLIC_SCHEMA = "public";

async function tableExists (
    tableName: string,
    schemaName = PUBLIC_SCHEMA
): Promise<unknown> {
    const result = await generateSqlAndQuery(new TableExists(), {
        tableName,
        schemaName
    });

    return result[0];
}

export default tableExists;
