import Joi from "@hapi/joi";

import { REDIS_HOST, REDIS_PORT } from "@const/env";
import EnvForRedis from "./types/EnvForRedis";
import ProcessManager from "@common/utils/helpers/ProcessManager";
import PropsValidator from "@common/utils/PropsValidator";
import RedisConfig from "./types/RedisConfig";

const { error, value } = validateEnvForRedis();

if (error) {
    logErrorAndExit(error);
}

export default createRedisConfig(value);

function validateEnvForRedis (): Joi.ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [REDIS_HOST, true],
        [REDIS_PORT, true]
    );
}

function logErrorAndExit (
    error: Joi.ValidationError
): void {
    new ProcessManager().exit(error);
}

function createRedisConfig (
    env: EnvForRedis
): RedisConfig {
    return {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT
    };
}
