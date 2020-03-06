import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import Version from "utils/Version";
import clearUserlessCookie from "utils/middlewares/clearUserlessCookie";
import createMorgan from "utils/initializers/createMorgan";
import createPgPool from "utils/initializers/createPgPool";
import createSession from "utils/initializers/createSession";
import handleError from "utils/middlewares/handleError";
import logErrors from "utils/middlewares/logErrors";
import sessionRouter from "api/session";
import userRouter from "api/user";

const app = express();
const pgPool = createPgPool();

const root = process.cwd();
const publicDirPath = join(root, "public");
const appMajorVersion = Version.getMajorVersion();
const apiRoute = `/api/v${appMajorVersion}`;

app.set("pgPool", pgPool);
app.use(createMorgan());
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(createSession());
app.use(clearUserlessCookie);
app.use(compression());
app.use(express.static(publicDirPath));
app.use(`${apiRoute}/user`, userRouter);
app.use(`${apiRoute}/session`, sessionRouter);
app.use(logErrors);
app.use(handleError);

export default app;
