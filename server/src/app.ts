import "module-alias/register";
import express from "express";
import http from "http";

import { SIGTERM } from "#utils/const/signals";
import ProcessManager from "#utils/helpers/ProcessManager";
import config from "#config";
import loaders from "#loaders";
import logger from "#logger";

const app = startServerAndGetApp();

export default app;

function startServerAndGetApp (): express.Application {
    const app = express();
    loaders.init(app);

    const { port } = config.server;
    const { exit, nodeEnv } = new ProcessManager();

    const server = app.listen(port, (error) => (error)
        ? exit(error)
        : logSuccess({ nodeEnv, port })
    );

    process.on(SIGTERM, () => logInfoAndCloseServer(server));

    return app;
}

function logSuccess (options: {
    nodeEnv: string;
    port: number;
}): void {
    const { nodeEnv, port } = options;

    logger.info(
        `Server is running at http://localhost:${port} in ${nodeEnv} mode`
    );
}

function logInfoAndCloseServer (server: http.Server): void {
    server.close(() => logger.info("Process terminated"));
}
