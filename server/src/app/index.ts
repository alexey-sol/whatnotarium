import { SIGTERM } from "constants/signals";
import { port } from "config/server";
import app from "./app";
import getEnv from "utils/getEnv";

const env = getEnv();

const server = app.listen(port, () => {
    console.log(
        "Server is running at http://localhost:%d in %s mode",
        port,
        env
    );
});

process.on(SIGTERM, () => {
    server.close(() => console.log("Process terminated"));
});

export default server;
