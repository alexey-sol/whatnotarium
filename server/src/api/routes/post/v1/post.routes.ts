import express from "express";

import controllers from "./controllers";
import dataValidation from "./dataValidation";
import middlewares from "#api/middlewares";
import schemaValidation from "./schemaValidation";

const router = express.Router();

router.get(
    "/",
    schemaValidation.getPosts,
    controllers.getPosts
);

router.get(
    "/search",
    schemaValidation.getSearch,
    controllers.getSearch
);

router.get(
    "/:id",
    schemaValidation.getPost,
    dataValidation.getPost,
    controllers.getPost
);

router.post(
    "/",
    schemaValidation.postPost,
    dataValidation.postPost,
    controllers.postPost
);

router.put(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.putPost,
    dataValidation.putPost,
    controllers.putPost
);

router.delete(
    "/:id",
    middlewares.isAuthed,
    schemaValidation.deletePost,
    dataValidation.deletePost,
    controllers.deletePost
);

export default router;
