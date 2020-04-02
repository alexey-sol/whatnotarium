import Joi from "@hapi/joi";

import { HOST, PORT, URL } from "@const/env";
import EnvForServer from "./types/EnvForServer";
import ProcessManager from "@common/utils/helpers/ProcessManager";
import PropsValidator from "@common/utils/PropsValidator";
import ServerConfig from "./types/ServerConfig";

const { error, value } = validateEnvForServer();

if (error) {
    logErrorAndExit(error);
}

export default createServerConfig(value);

function validateEnvForServer (): Joi.ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [HOST, true],
        [PORT, true],
        [URL, true]
    );
}

function logErrorAndExit (
    error: Joi.ValidationError
): void {
    new ProcessManager().exit(error);
}

function createServerConfig (
    env: EnvForServer
): ServerConfig {
    return {
        host: env.HOST,
        port: env.PORT,
        url: env.URL
    };
}
