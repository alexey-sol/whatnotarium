import express from "express";

import {
    authenticate
} from "./controllers";

const router = express.Router();

router.post("/", authenticate);

export default router;
