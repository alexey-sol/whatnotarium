import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/",
    dataValidation.getSession,
    controllers.getSession
);

router.post(
    "/",
    schemaValidation.postSession,
    dataValidation.postSession,
    controllers.postSession
);

router.delete(
    "/",
    controllers.deleteSession
);

export default router;
