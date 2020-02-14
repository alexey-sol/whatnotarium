import "module-alias/register";
import { ValidationError, ValidationResult } from "@hapi/joi";
import dotenv from "dotenv";

import { DEVELOPMENT } from "constants/nodeEnv";
import { NODE_ENV } from "constants/env";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";

const { error, value } = validateNodeEnv();

if (error) {
    logErrorAndExit(error);
}

const isDevelopment = value.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    dotenv.config();
}

export default require("./app");

function validateNodeEnv (): ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [NODE_ENV, true]
    );
}

function logErrorAndExit (
    error: ValidationError
): void {
    new ProcessManager().exit(error);
}
