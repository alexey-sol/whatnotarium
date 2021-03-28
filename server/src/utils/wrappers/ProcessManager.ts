import { Client, Pool } from "pg";

import { SIGTERM } from "#utils/const/signals";
import logger from "#logger";

const ERROR_CODE = 1;
const SUCCESS_CODE = 0;

class ProcessManager {
    constructor (
        private pg?: Client | Pool,
        private nodeProcess: NodeJS.Process = process
    ) {
        this.pg = pg;
        this.nodeProcess = nodeProcess;
    }

    get processEnv (): NodeJS.ProcessEnv {
        return this.nodeProcess.env;
    }

    get nodeEnv (): string {
        const { NODE_ENV } = this.processEnv;
        const isString = typeof NODE_ENV === "string";

        return (isString)
            ? NODE_ENV!.trim()
            : "";
    }

    async exit (
        loggingMessage?: Error | string,
        code = ERROR_CODE
    ): Promise<void> {
        if (loggingMessage) {
            this.logMessage(loggingMessage, code);
        }

        await this.closeDatabaseIfNeeded();
        this.nodeProcess.exit(code);
    }

    async killGracefully (
        loggingMessage?: Error | string
    ): Promise<void> {
        if (loggingMessage) {
            this.logMessage(loggingMessage, SUCCESS_CODE);
        }

        await this.closeDatabaseIfNeeded();
        this.nodeProcess.kill(this.nodeProcess.pid, SIGTERM);
    }

    private logMessage (
        loggingMessage: Error | string,
        code: number
    ): void {
        const isSuccess = code === SUCCESS_CODE;

        if (isSuccess) {
            logger.info(loggingMessage as string);
        } else {
            logger.error(loggingMessage as Error);
        }
    }

    private async closeDatabaseIfNeeded (): Promise<void> {
        if (this.pg) {
            await this.pg.end();
        }
    }
}

export default ProcessManager;
