import { join } from "path";
import express from "express";
import multer from "multer";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import middlewares from "#api/middlewares";
import schemaValidation from "./schemaValidation";

const root = process.cwd();
const uploadsDirPath = join(root, "uploads");
const uploads = multer({ dest: uploadsDirPath });

const router = express.Router();

router.get(
    "/",
    controllers.getUsers
);

router.get(
    "/search",
    schemaValidation.getSearch,
    controllers.getSearch
);

router.get(
    "/:id",
    schemaValidation.getUser,
    middlewares.readRouteCache,
    dataValidation.getUser,
    controllers.getUser,
    middlewares.writeRouteCache
);

router.post(
    "/",
    schemaValidation.postUser,
    dataValidation.postUser,
    controllers.postUser
);

router.put(
    "/:id/picture",
    middlewares.isAuthed,
    uploads.single("picture"),
    schemaValidation.putUserPicture,
    dataValidation.putUserPicture,
    controllers.putUserPicture,
    middlewares.clearRouteCache
);

router.put(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.putUser,
    dataValidation.putUser,
    controllers.putUser,
    middlewares.clearRouteCache
);

router.delete(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.deleteUser,
    dataValidation.deleteUser,
    controllers.deleteUser
);

export default router;
