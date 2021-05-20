import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";

import Version from "#utils/helpers/Version";
import corsOptions from "#config/cors";
import initMorgan from "./helpers/initMorgan";
import initSession from "./helpers/initSession";
import middlewares from "#api/middlewares";
import adminRouter from "#api/routes/admin/v1";
import oauthRouter from "#api/routes/oauth/v1";
import postRouter from "#api/routes/post/v1";
import sessionRouter from "#api/routes/session/v1";
import supportRouter from "#api/routes/support/v1";
import userRouter from "#api/routes/user/v1";

interface Options {
    app: express.Application;
}

export default function (options: Options): express.Application {
    const { app } = options;

    const root = process.cwd();
    const publicDirPath = join(root, "public");
    const appMajorVersion = Version.getMajorVersion();
    const apiRoute = `/api/v${appMajorVersion}`;

    app.use(initMorgan());
    app.use(cors(corsOptions));
    app.use(helmet());
    app.use(bodyParser.json({ limit: "1mb" }));
    app.use(cookieParser());
    app.use(initSession());
    app.use(compression());
    app.use(express.static(publicDirPath));
    app.use(middlewares.clearUserlessCookie);
    app.use(`${apiRoute}/admin`, adminRouter);
    app.use(`${apiRoute}/oauth`, oauthRouter);
    app.use(`${apiRoute}/post`, postRouter);
    app.use(`${apiRoute}/user`, userRouter);
    app.use(`${apiRoute}/session`, sessionRouter);
    app.use(`${apiRoute}/support`, supportRouter);
    app.use(middlewares.logError);
    app.use(middlewares.handleError);

    return app;
}
