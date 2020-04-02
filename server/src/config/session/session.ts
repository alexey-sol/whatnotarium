import Joi from "@hapi/joi";

import { SESSION_NAME, SESSION_SECRET } from "@const/env";
import EnvForSession from "./types/EnvForSession";
import ProcessManager from "@common/utils/helpers/ProcessManager";
import PropsValidator from "@common/utils/PropsValidator";
import SessionConfig from "./types/SessionConfig";

const { error, value } = validateEnvForSession();

if (error) {
    logErrorAndExit(error);
}

export default createSessionConfig(value);

function validateEnvForSession (): Joi.ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [SESSION_NAME, true],
        [SESSION_SECRET, true]
    );
}

function logErrorAndExit (
    error: Joi.ValidationError
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
