import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import middlewares from "#api/middlewares";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.put(
    "/posts/:id",
    middlewares.isAdmin,
    schemaValidation.putApproval,
    dataValidation.putApproval,
    controllers.putApproval
);

export default router;
