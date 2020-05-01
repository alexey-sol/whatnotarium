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

const pool = require("#connectionPool").default;
const resetTables = require("#utils/test/resetTables").default;

before(resetTables);
after(exit);

function logErrorAndExit (errorToLog: Error | string): void {
    new ProcessManager(pool).exit(errorToLog);
}

function exit (): void {
    new ProcessManager(pool).exit(undefined, 0);
}
