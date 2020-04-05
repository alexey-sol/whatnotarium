import EnvForServer from "./types/EnvForServer";
import ServerConfig from "./types/ServerConfig";

export default function (env: EnvForServer): ServerConfig {
    const {
        HOST,
        PORT,
        URL
    } = env;

    return {
        host: HOST,
        port: PORT,
        url: URL
    };
}
