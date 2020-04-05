import express from "express";

import envLoader from "./env";
import expressLoader from "./express";
import logger from "#logger";
import pgLoader from "./pg";

function init (app: express.Application): void {
    envLoader();
    logger.info("🔵 Environment variables are ready");

    const pg = pgLoader();
    logger.info("🔵 Database is ready");

    expressLoader({ app, pg });
    logger.info("🔵 Express is ready");
}

export default {
    init
};
