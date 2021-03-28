import dotenv from "dotenv";

import { DEVELOPMENT } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/wrappers/ProcessManager";
import validateEnv from "#utils/validators/validateEnv";

export default function (): void {
    const { nodeEnv } = new ProcessManager();

    if (!nodeEnv) {
        logErrorAndExit("🔴 NODE_ENV is not set");
    }

    const isDevelopment = nodeEnv === DEVELOPMENT;

    if (isDevelopment) {
        dotenv.config();
    }

    const { error } = validateEnv();

    if (error) {
        logErrorAndExit(error);
    }
}

function logErrorAndExit (error: Error | string): void {
    new ProcessManager().exit(error);
}
