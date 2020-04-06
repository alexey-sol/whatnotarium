import "module-alias/register";
import express from "express";
import http from "http";

import { SIGTERM } from "#utils/const/signals";
import ProcessManager from "#utils/helpers/ProcessManager";
import loaders from "#loaders";
import logger from "#logger";
import serverConfig from "#config/server";

const app = startServerAndGetApp();

export default app;

function startServerAndGetApp (): express.Application {
    const app = express();
    loaders.init(app);

    const { port } = serverConfig;
    const { exit, nodeEnv } = new ProcessManager();

    const server = app.listen(+port, (error) => (error)
        ? exit(error)
        : logSuccess({ nodeEnv, port }) // ?
    );

    process.on(SIGTERM, () => logInfoAndCloseServer(server));

    return app;
}

function logSuccess (options: {
    nodeEnv: string;
    port: string;
}): void {
    const { nodeEnv, port } = options;

    logger.info(
        `🚀 Server is running at http://localhost:${port} in ${nodeEnv} mode`
    );
}

function logInfoAndCloseServer (server: http.Server): void {
    server.close(() => logger.info("Process terminated"));
}
