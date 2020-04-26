import ProcessManager from "#utils/helpers/ProcessManager";
import createTablesIfNotExist from "#utils/sql/createTablesIfNotExist";
import pool from "#connectionPool";

export default async function (): Promise<void> {
    try {
        await createTablesIfNotExist();
    } catch (error) {
        logErrorAndExit(error);
    }
}

function logErrorAndExit (error: Error): void {
    new ProcessManager(pool).exit(error);
}
