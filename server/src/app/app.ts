import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";

import createMorgan from "utils/createMorgan";
import createPgPool from "utils/createPgPool";
import createSession from "utils/createSession";
import getAppVersion from "utils/getAppVersion";
import handleError from "utils/middlewares/handleError";
import logErrors from "utils/middlewares/logErrors";
import userRouter from "api/user";

const app = express();
const pgPool = createPgPool();

const root = process.cwd();
const publicDirPath = join(root, "public");
const appMajorVersion = getAppVersion(true);
const apiRoute = `/api/v${appMajorVersion}`;

app.set("pgPool", pgPool);
app.use(createMorgan());
app.use(cors());
app.use(bodyParser.json());
app.use(createSession());
app.use(compression());
app.use(express.static(publicDirPath));
app.use(`${apiRoute}/user`, userRouter);
app.use(logErrors);
app.use(handleError);

export default app;
