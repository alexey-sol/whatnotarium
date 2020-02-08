import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import createPgPool from "utils/createPgPool";
import getAppVersion from "utils/getAppVersion";
import handleError from "utils/middlewares/handleError";
import logErrors from "utils/middlewares/logErrors";
import logger from "utils/winston";
import userRouter from "api/user";

const app = express();
const pgPool = createPgPool();

const root = process.cwd();
const publicDirPath = join(root, "public");
const appMajorVersion = getAppVersion(true);
const apiRoute = `/api/v${appMajorVersion}`;

app.set("pgPool", pgPool);

app.use(morgan("combined", getMorganOptions()));
app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(publicDirPath));
// session
app.use(`${apiRoute}/user`, userRouter);
app.use(logErrors);
app.use(handleError);

export default app;

function getMorganOptions (): morgan.Options {
    return {
        stream: {
            write: (message) => logger.info(message)
        }
    };
}
