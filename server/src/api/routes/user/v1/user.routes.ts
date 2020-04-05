import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/",
    controllers.getUsers
);

router.get(
    "/:id",
    schemaValidation.getUser,
    dataValidation.getUser,
    controllers.getUser
);

router.post(
    "/",
    schemaValidation.postUser,
    dataValidation.postUser,
    controllers.postUser
);

router.put(
    "/",
    schemaValidation.putUser,
    dataValidation.putUser,
    controllers.putUser
);

router.delete(
    "/:id",
    schemaValidation.deleteUser,
    dataValidation.deleteUser,
    controllers.deleteUser
);

export default router;
