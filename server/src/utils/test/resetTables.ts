import createTablesIfNotExist from "#utils/sql/createTablesIfNotExist";
import resetPublicSchema from "#utils/test/resetPublicSchema";

async function resetTables (): Promise<void> {
    await resetPublicSchema();
    await createTablesIfNotExist();
}

export default resetTables;
