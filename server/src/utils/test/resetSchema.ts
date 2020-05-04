import { CreateSchema, DropSchema } from "#utils/sql/SchemaSqlGenerator";
import { PUBLIC } from "#utils/const/database/schemaNames";
import generateSqlAndQuery from "#utils/sql/generateSqlAndQuery";

async function resetSchema (schemaName = PUBLIC): Promise<void> {
    await generateSqlAndQuery(new DropSchema(schemaName));
    await generateSqlAndQuery(new CreateSchema(schemaName));
}

export default resetSchema;
