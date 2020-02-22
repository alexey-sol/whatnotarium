import Joi from "@hapi/joi";

import { PG_URL, PG_URL_DEV } from "constants/env";
import { PRODUCTION } from "constants/nodeEnv";
import EnvForDatabase from "types/env/EnvForDatabase";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";
import ValidationError from "utils/errors/ValidationError";

const processManager = new ProcessManager();
const nodeEnv = processManager.getEnv();

const { error, value } = validateEnvForDatabase();

if (error) {
    logErrorAndExit(error);
}

export default createDatabaseUrl(value);

function validateEnvForDatabase (): Joi.ValidationResult {
    const envValidator = new PropsValidator(process.env);
    const isProduction = nodeEnv === PRODUCTION;

    const appropriateDatabaseUrl = (isProduction)
        ? PG_URL
        : PG_URL_DEV;

    return envValidator.validate(
        [appropriateDatabaseUrl, true]
    );
}

function logErrorAndExit (
    error: Joi.ValidationError
): void {
    processManager.exit(error);
}

function createDatabaseUrl (
    env: EnvForDatabase
): string | never {
    const isProduction = nodeEnv === PRODUCTION;

    const url = (isProduction)
        ? env.PG_URL
        : env.PG_URL_DEV;

    if (!url) {
        throw new ValidationError(
            "No database connection string specified",
            500
        );
    }

    return url;
}
