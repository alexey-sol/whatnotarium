import express from "express";

import {
    createUser,
    getUser,
    updateUser
} from "./user.controllers";

const router = express.Router();

router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);

export default router;
