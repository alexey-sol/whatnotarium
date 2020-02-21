import { ValidationError, ValidationResult } from "@hapi/joi";

import { SESSION_NAME, SESSION_SECRET } from "constants/env";
import EnvForSession from "types/env/EnvForSession";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";
import SessionConfig from "types/config/SessionConfig";

const { error, value } = validateEnvForSession();

if (error) {
    logErrorAndExit(error);
}

export default createSessionConfig(value);

function validateEnvForSession (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [SESSION_NAME, true],
        [SESSION_SECRET, true]
    );
}

function logErrorAndExit (
    error: ValidationError
): void {
    new ProcessManager().exit(error);
}

function createSessionConfig (
    env: EnvForSession
): SessionConfig {
    return {
        name: env.SESSION_NAME,
        secret: env.SESSION_SECRET
    };
}
