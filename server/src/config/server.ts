import { HOST, PORT, URL } from "constants/env";
import EnvForServerConfig from "types/config/EnvForServerConfig";
import PropsValidator from "utils/PropsValidator";
import ServerConfig from "types/config/ServerConfig";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const envForServerConfig = validateEnv();
const serverConfig = createServerConfig(envForServerConfig);

export default serverConfig;

function validateEnv (): EnvForServerConfig {
    const envValidator = new PropsValidator(process.env);

    const { error, value } = envValidator.validate(
        HOST,
        PORT,
        URL
    );

    if (error) {
        logger.error(error);
        terminateProcess();
    }

    return value as EnvForServerConfig;
}

function createServerConfig (
    env: EnvForServerConfig
): ServerConfig {
    return {
        host: env.HOST,
        port: env.PORT,
        url: env.URL
    };
}
