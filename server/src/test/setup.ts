import dotenv from "dotenv";
import { join } from "path";

import ProcessManager from "#utils/helpers/ProcessManager";
import validateEnv from "#utils/validators/validateEnv";

const { nodeEnv } = new ProcessManager();

if (!nodeEnv) {
    logErrorAndExit("🔴 NODE_ENV is not set");
}

dotenv.config({
    path: join(process.cwd(), "..", ".env")
});

const { error } = validateEnv();

if (error) {
    logErrorAndExit(error);
}

function logErrorAndExit (errorToLog: Error | string): void {
    new ProcessManager().exit(errorToLog);
}
