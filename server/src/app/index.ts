import app from "./app";
import getEnv from "utils/getEnv";

const env = getEnv();
const { PORT } = process.env;
// PORT to config

const server = app.listen(PORT, () => {
    console.log(
        "App is running at http://localhost:%d in %s mode",
        PORT,
        env
    );
});

export default server;
