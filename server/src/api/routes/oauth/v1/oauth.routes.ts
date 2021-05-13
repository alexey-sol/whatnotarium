import express from "express";

import controllers from "./controllers";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/:provider",
    schemaValidation.getToken,
    controllers.getToken
);

export default router;
