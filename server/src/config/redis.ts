import { ValidationError, ValidationResult } from "@hapi/joi";

import { REDIS_HOST, REDIS_PORT } from "constants/env";
import EnvForRedis from "types/env/EnvForRedis";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";
import RedisConfig from "types/config/RedisConfig";

const { error, value } = validateEnvForRedis();

if (error) {
    logErrorAndExit(error);
}

export default createRedisConfig(value);

function validateEnvForRedis (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [REDIS_HOST, true],
        [REDIS_PORT, true]
    );
}

function logErrorAndExit (
    error: ValidationError
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
