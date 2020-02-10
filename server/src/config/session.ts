import { ValidationError, ValidationResult } from "@hapi/joi";

import { SESSION_SECRET } from "constants/env";
import EnvForSession from "types/env/EnvForSession";
import PropsValidator from "utils/PropsValidator";
import SessionConfig from "types/config/SessionConfig";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const { error, value } = validateEnvForSession();

if (error) {
    logErrorAndTerminateProcess(error);
}

export default createSessionConfig(value);

function validateEnvForSession (): ValidationResult {
    const envValidator = new PropsValidator(process.env);
    return envValidator.validate(SESSION_SECRET);
}

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
}

function createSessionConfig (
    env: EnvForSession
): SessionConfig {
    return {
        secret: env.SESSION_SECRET
    };
}
