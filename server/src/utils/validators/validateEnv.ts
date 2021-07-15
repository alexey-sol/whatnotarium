import Joi from "@hapi/joi";

import ProcessManager from "#utils/wrappers/ProcessManager";
import envSchema from "./schemas/env";

const { processEnv } = new ProcessManager();

function validateEnv (
    env = processEnv
): Joi.ValidationResult {
    return envSchema.validate(env, {
        stripUnknown: true
    });
}

export default validateEnv;
