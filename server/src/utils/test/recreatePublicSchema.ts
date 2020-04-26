import { CreateSchema, DropSchema } from "#utils/sql/ManageDatabaseSql";
import createTablesIfNotExist from "#utils/sql/createTablesIfNotExist";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function recreatePublicSchema (): Promise<void> {
    const PUBLIC_SCHEMA = "public";

    await generateSqlAndQuery(new DropSchema(), PUBLIC_SCHEMA);
    await generateSqlAndQuery(new CreateSchema(), PUBLIC_SCHEMA);
    await createTablesIfNotExist();
}

export default recreatePublicSchema;
