import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import Version from "utils/Version";
import clearUserlessCookie from "utils/middlewares/clearUserlessCookie";
import handleError from "utils/middlewares/handleError";
import initMorgan from "utils/initializers/initMorgan";
import initPgPool from "utils/initializers/initPgPool";
import initSession from "utils/initializers/initSession";
import logErrors from "utils/middlewares/logErrors";
import sessionRouter from "api/session";
import userRouter from "api/user";

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

export default app;
