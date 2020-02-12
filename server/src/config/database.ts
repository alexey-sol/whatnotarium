import { ValidationError, ValidationResult } from "@hapi/joi";

import { PG_URL, PG_URL_DEV } from "constants/env";
import { PRODUCTION } from "constants/nodeEnv";
import EnvForDatabase from "types/env/EnvForDatabase";
import ProcessManager from "utils/ProcessManager";
import PropsError from "utils/errors/PropsError";
import PropsValidator from "utils/PropsValidator";

const processManager = new ProcessManager();
const nodeEnv = processManager.getEnv();

const { error, value } = validateEnvForDatabase();

if (error) {
    logErrorAndExit(error);
}

export default createDatabaseUrl(value);

function validateEnvForDatabase (): ValidationResult {
    const envValidator = new PropsValidator(process.env);
    const isProduction = nodeEnv === PRODUCTION;

    const appropriateDatabaseEnv = (isProduction)
        ? PG_URL
        : PG_URL_DEV;

    return envValidator.validate(appropriateDatabaseEnv);
}

function logErrorAndExit (
    error: ValidationError
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
        throw new PropsError("No database connection string specified", 500);
    }

    return url;
}
