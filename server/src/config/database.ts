import { ValidationError, ValidationResult } from "@hapi/joi";

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
import DatabaseConfig from "types/DatabaseConfig";
import EnvForDatabase from "types/env/EnvForDatabase";
import PropsValidator from "utils/PropsValidator";
import getEnv from "utils/getEnv";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const { error, value } = validateEnvForDatabaseVars();

if (error) {
    logErrorAndTerminateProcess(error);
}

export default createDatabaseConfig(value);

function validateEnvForDatabaseVars (): ValidationResult {
    const envValidator = new PropsValidator(process.env);
    const isProduction = getEnv() === PRODUCTION;

    const appropriateDatabaseEnv = (isProduction)
        ? PG_DATABASE
        : PG_DATABASE_DEV;

    return envValidator.validate(
        appropriateDatabaseEnv,
        PG_HOST,
        PG_PORT,
        PG_USER,
        PG_PASSWORD
    );
}

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
}

function createDatabaseConfig (
    env: EnvForDatabase
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
