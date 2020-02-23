import { SIGTERM } from "constants/signals";
import ProcessManager from "utils/ProcessManager";
import app from "./app";
import automigrate from "utils/automigrate";
import logger from "utils/winston";
import serverConfig from "config/server";

const { port } = serverConfig;
const env = new ProcessManager().getEnv();
const server = app.listen(port, automigrateAndLogInfo);

process.on(SIGTERM, () => {
    server.close(() => logger.info("Process terminated"));
});

export default app;

async function automigrateAndLogInfo (): Promise<void> {
    await automigrate();

    logger.info(
        `Server is running at http://localhost:${port} in ${env} mode`
    );
}
