import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";

import createPgPool from "utils/createPgPool";
import getAppVersion from "utils/getAppVersion";
import userRouter from "api/user";

const app = express();

const pgPool = createPgPool();
const publicDir = join("root", "public");
const appMajorVersion = getAppVersion(true);
const apiRoute = `/api/v${appMajorVersion}`;

app.set("pgPool", pgPool);

app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(publicDir));
// session
app.use(`${apiRoute}/user`, userRouter);

export default app;
