import { CreateSchema, DropSchema } from "#utils/sql/SchemaSqlGenerator";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function resetPublicSchema (): Promise<void> {
    const PUBLIC_SCHEMA = "public";

    await generateSqlAndQuery(new DropSchema(PUBLIC_SCHEMA));
    await generateSqlAndQuery(new CreateSchema(PUBLIC_SCHEMA));
}

export default resetPublicSchema;
