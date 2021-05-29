import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/confirm",
    schemaValidation.sendConfirmToken,
    dataValidation.sendConfirmToken,
    controllers.sendConfirmToken
);

router.post(
    "/confirm",
    schemaValidation.confirmEmail,
    dataValidation.confirmEmail,
    controllers.confirmEmail
);

router.get(
    "/reset",
    schemaValidation.sendResetToken,
    dataValidation.sendResetToken,
    controllers.sendResetToken
);

router.post(
    "/reset",
    schemaValidation.resetPassword,
    dataValidation.resetPassword,
    controllers.resetPassword
);

export default router;
