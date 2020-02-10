import { ValidationError, ValidationResult } from "@hapi/joi";

import { REDIS_HOST, REDIS_PORT } from "constants/env";
import EnvForRedis from "types/env/EnvForRedis";
import PropsValidator from "utils/PropsValidator";
import RedisConfig from "types/config/RedisConfig";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const { error, value } = validateEnvForRedis();

if (error) {
    logErrorAndTerminateProcess(error);
}

export default createRedisConfig(value);

function validateEnvForRedis (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        REDIS_HOST,
        REDIS_PORT
    );
}

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
}

function createRedisConfig (
    env: EnvForRedis
): RedisConfig {
    return {
        host: env.REDIS_HOST,
        port: env.REDIS_PORT
    };
}
