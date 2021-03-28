import "module-alias/register";
import express from "express";
import http from "http";

import { SIGTERM } from "#utils/const/signals";
import ProcessManager from "#utils/wrappers/ProcessManager";
import loaders from "#loaders";
import logger from "#logger";
import serverConfig from "#config/server";

startServer();

async function startServer (): Promise<void> {
    const app = express();
    await loaders.init(app);

    const pool = require("#connectionPool").default; // eslint-disable-line
    const { port, url } = serverConfig;
    const { exit, nodeEnv } = new ProcessManager(pool);

    const server = app.listen(+port, (error) => (error)
        ? exit(error)
        : logSuccess({ nodeEnv, url })
    );

    process.on(SIGTERM, () => logInfoAndCloseServer(server));
}

function logSuccess (options: {
    nodeEnv: string;
    url: string;
}): void {
    const { nodeEnv, url } = options;
    logger.info(`🚀 Server is running at ${url} in ${nodeEnv} mode`);
}

function logInfoAndCloseServer (server: http.Server): void {
    server.close(() => logger.info("Process terminated"));
}
