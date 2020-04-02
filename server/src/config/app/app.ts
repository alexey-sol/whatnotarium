import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";

import { SIGTERM } from "@const/signals";
import ProcessManager from "@common/utils/helpers/ProcessManager";
import Version from "@common/utils/helpers/Version";
import clearUserlessCookie from "@common/utils/middlewares/clearUserlessCookie";
import createTables from "./helpers/createTables";
import handleError from "@common/utils/middlewares/handleError";
import initMorgan from "./helpers/initMorgan";
import initPgPool from "./helpers/initPgPool";
import initSession from "./helpers/initSession";
import logger from "@config/logger";
import logErrors from "@common/utils/middlewares/logErrors";
import serverConfig from "@config/server";
import sessionRouter from "@session/api/v1";
import userRouter from "@user/api/v1";

const app = express();
const pgPool = initPgPool();

const root = process.cwd();
const publicDirPath = join(root, "public");
const appMajorVersion = Version.getMajorVersion();
const apiRoute = `/api/v${appMajorVersion}`;

app.set("pgPool", pgPool);
app.use(initMorgan());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(initSession());
app.use(clearUserlessCookie);
app.use(compression());
app.use(express.static(publicDirPath));
app.use(`${apiRoute}/user`, userRouter);
app.use(`${apiRoute}/session`, sessionRouter);
app.use(logErrors);
app.use(handleError);

startServerAndDatabase();

export default app;

function startServerAndDatabase (): void {
    const { port } = serverConfig;
    const env = new ProcessManager().getEnv();
    const server = app.listen(port, () => createTablesAndLogInfo(port, env));

    process.on(SIGTERM, () => logInfoAndCloseServer(server));
}

async function createTablesAndLogInfo (
    port: number,
    nodeEnv: string
): Promise<void> {
    await createTables();

    logger.info(
        `Server is running at http://localhost:${port} in ${nodeEnv} mode`
    );
}

async function logInfoAndCloseServer (
    server: http.Server
): Promise<void> {
    server.close(() => logger.info("Process terminated"));
}
