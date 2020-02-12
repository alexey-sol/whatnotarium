import { ValidationError, ValidationResult } from "@hapi/joi";

import { HOST, PORT, URL } from "constants/env";
import EnvForServer from "types/env/EnvForServer";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";
import ServerConfig from "types/config/ServerConfig";

const { error, value } = validateEnvForServer();

if (error) {
    logErrorAndExit(error);
}

export default createServerConfig(value);

function validateEnvForServer (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        HOST,
        PORT,
        URL
    );
}

function logErrorAndExit (
    error: ValidationError
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
