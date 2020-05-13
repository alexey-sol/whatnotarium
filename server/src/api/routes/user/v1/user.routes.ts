import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import middlewares from "#api/middlewares";
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
    "/:id",
    middlewares.isAuthed,
    schemaValidation.putUser,
    dataValidation.putUser,
    controllers.putUser
);

router.delete(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.deleteUser,
    dataValidation.deleteUser,
    controllers.deleteUser
);

export default router;
