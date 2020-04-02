import "module-alias/register";
import Joi from "@hapi/joi";
import dotenv from "dotenv";

import { DEVELOPMENT } from "@const/nodeEnv";
import { NODE_ENV } from "@const/env";
import ProcessManager from "@common/utils/helpers/ProcessManager";
import PropsValidator from "@common/utils/PropsValidator";

const { error, value } = validateNodeEnv();

if (error) {
    logErrorAndExit(error);
}

const isDevelopment = value.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    dotenv.config();
}

export default require("./app");

function validateNodeEnv (): Joi.ValidationResult {
    const envValidator = new PropsValidator(process.env);

    return envValidator.validate(
        [NODE_ENV, true]
    );
}

function logErrorAndExit (
    error: Joi.ValidationError
): void {
    new ProcessManager().exit(error);
}
