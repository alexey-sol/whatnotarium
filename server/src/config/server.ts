import { ValidationError, ValidationResult } from "@hapi/joi";

import { HOST, PORT, URL } from "constants/env";
import EnvForServer from "types/env/EnvForServer";
import PropsValidator from "utils/PropsValidator";
import ServerConfig from "types/ServerConfig";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const { error, value } = validateEnvForServerVars();

if (error) {
    logErrorAndTerminateProcess(error);
}

export default createServerConfig(value);

function validateEnvForServerVars (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        HOST,
        PORT,
        URL
    );
}

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
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
