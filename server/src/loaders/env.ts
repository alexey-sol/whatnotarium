import dotenv from "dotenv";

import { DEVELOPMENT } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/helpers/ProcessManager";

export default function (): void {
    const { nodeEnv } = new ProcessManager();

    if (!nodeEnv) {
        logErrorAndExit("NODE_ENV is not set");
    }

    const isDevelopment = nodeEnv === DEVELOPMENT;

    if (isDevelopment) {
        dotenv.config();
    }
}

function logErrorAndExit (errorMessage: string): void {
    new ProcessManager().exit(errorMessage);
}
