import { join } from "path";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import express from "express";
// import session from "express-session";

const app = express();
const publicDir = join(__dirname, "..", "public");

app.use(cors());
app.use(bodyParser.json());
app.use(compression());
app.use(express.static(publicDir));
// session

app.get("/", (req, res, next) => res.send("Hello world"));

export default app;
