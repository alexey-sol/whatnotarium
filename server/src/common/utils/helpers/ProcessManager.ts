import { Client, Pool } from "pg";
import { SIGTERM } from "const/signals";
import logger from "config/logger";

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

    exit (
        loggingMessage?: Error | string,
        code = 1
    ): never {
        if (loggingMessage) {
            this.logMessage(loggingMessage);
        }

        this.nodeProcess.exit(code);
    }

    async killGracefully (loggingMessage?: Error | string): Promise<void> {
        if (loggingMessage) {
            this.logMessage(loggingMessage);
        }

        if (this.pg) {
            await this.pg.end();
        }

        this.nodeProcess.kill(this.nodeProcess.pid, SIGTERM);
    }

    private logMessage (loggingMessage: Error | string): void {
        const isError = loggingMessage instanceof Error;

        if (isError) {
            logger.error(loggingMessage as Error);
        } else {
            logger.info(loggingMessage as string);
        }
    }
}

export default ProcessManager;
