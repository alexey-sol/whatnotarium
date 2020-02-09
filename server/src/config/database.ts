import {
    PG_DATABASE,
    PG_DATABASE_DEV,
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASSWORD
} from "constants/env";

import { PRODUCTION } from "constants/nodeEnv";
import ConfigError from "utils/errors/ConfigError";
import DatabaseConfig from "types/config/DatabaseConfig";
import EnvForDatabaseConfig from "types/config/EnvForDatabaseConfig";
import PropsValidator from "utils/PropsValidator";
import getEnv from "utils/getEnv";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const envForDatabaseConfig = validateEnv();
const databaseConfig = createDatabaseConfig(envForDatabaseConfig);

export default databaseConfig;

function validateEnv (): EnvForDatabaseConfig {
    const envValidator = new PropsValidator(process.env);
    const isProduction = getEnv() === PRODUCTION;

    const appropriateDatabaseEnv = (isProduction)
        ? PG_DATABASE
        : PG_DATABASE_DEV;

    const { error, value } = envValidator.validate(
        appropriateDatabaseEnv,
        PG_HOST,
        PG_PORT,
        PG_USER,
        PG_PASSWORD
    );

    if (error) {
        logger.error(error);
        terminateProcess();
    }

    return value as EnvForDatabaseConfig;
}

function createDatabaseConfig (
    env: EnvForDatabaseConfig
): DatabaseConfig | never {
    const isProduction = getEnv() === PRODUCTION;

    const database = (isProduction)
        ? env.PG_DATABASE
        : env.PG_DATABASE_DEV;

    if (!database) {
        throw new ConfigError("No database specified for development");
    }

    return {
        database,
        host: env.PG_HOST,
        password: env.PG_PASSWORD,
        port: env.PG_PORT,
        user: env.PG_USER
    };
}
