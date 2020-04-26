import Joi from "@hapi/joi";

import { TEST } from "#utils/const/nodeEnv";
import ProcessManager from "#utils/helpers/ProcessManager";
import envSchema from "./schemas/env";
import envTestSchema from "./schemas/envTest";

const { nodeEnv, processEnv } = new ProcessManager();
const isTest = nodeEnv === TEST;

function validateEnv (
    env = processEnv
): Joi.ValidationResult {
    const schema = (isTest)
        ? envTestSchema
        : envSchema;

    return schema.validate(env, {
        stripUnknown: true
    });
}

export default validateEnv;
