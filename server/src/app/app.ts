import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";

import getAppVersion from "utils/getAppVersion";
import userRouter from "api/user";

const app = express();
const publicDir = join("root", "public");
const appMajorVersion = getAppVersion(true);
const apiRoute = `/api/v${appMajorVersion}`;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(express.static(publicDir));
// session

app.use(`${apiRoute}/user`, userRouter);

export default app;
