import express from "express";

import {
    createSession,
    deleteSession,
    getSession
} from "./controllers";

const router = express.Router();

router.get("/", getSession);
router.post("/", createSession);
router.delete("/", deleteSession);

export default router;
