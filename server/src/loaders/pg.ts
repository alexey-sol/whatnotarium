import ProcessManager from "#utils/helpers/ProcessManager";
import createTablesIfNotExist from "./helpers/createTablesIfNotExist";

export default async function (): Promise<void> {
    try {
        await createTablesIfNotExist();
    } catch (error) {
        logErrorAndExit(error);
    }
}

function logErrorAndExit (error: Error): void {
    new ProcessManager().exit(error);
}
