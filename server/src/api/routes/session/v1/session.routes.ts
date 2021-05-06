import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import schemaValidation from "./schemaValidation";
import middlewares from "#api/middlewares";

const router = express.Router();

router.get(
    "/",
    dataValidation.getSession,
    controllers.getSession,
    middlewares.clearRouteCache
);

router.post(
    "/",
    schemaValidation.postSession,
    dataValidation.postSession,
    controllers.postSession,
    middlewares.clearRouteCache
);

router.delete(
    "/",
    controllers.deleteSession,
    middlewares.clearRouteCache
);

export default router;
