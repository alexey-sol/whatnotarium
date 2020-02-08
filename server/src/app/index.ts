import { SIGTERM } from "constants/signals";
import app from "./app";
import getEnv from "utils/getEnv";
import logger from "utils/winston";
import serverConfig from "config/server";

const { port } = serverConfig;
const env = getEnv();

const server = app.listen(port, () => {
    logger.info(
        `Server is running at http://localhost:${port} in ${env} mode`
    );
});

process.on(SIGTERM, () => {
    server.close(() => logger.info("Process terminated"));
});

export default app;
