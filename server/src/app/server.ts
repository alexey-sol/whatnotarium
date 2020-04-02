import { SIGTERM } from "constants/signals";
import ProcessManager from "utils/ProcessManager";
import app from "./app";
import createTables from "utils/initializers/createTables";
import logger from "utils/logger";
import serverConfig from "config/server";

const { port } = serverConfig;
const env = new ProcessManager().getEnv();
const server = app.listen(port, createTablesAndLogInfo);

process.on(SIGTERM, logInfoAndCloseServer);

export default app;

async function createTablesAndLogInfo (): Promise<void> {
    await createTables();

    logger.info(
        `Server is running at http://localhost:${port} in ${env} mode`
    );
}

async function logInfoAndCloseServer (): Promise<void> {
    server.close(() => logger.info("Process terminated"));
}
