import "module-alias/register";
import { ValidationError } from "@hapi/joi";
import dotenv from "dotenv";

import { DEVELOPMENT } from "constants/nodeEnv";
import { NODE_ENV } from "constants/env";
import ProcessManager from "utils/ProcessManager";
import PropsValidator from "utils/PropsValidator";

const envValidator = new PropsValidator(process.env);
const { error, value } = envValidator.validate(NODE_ENV);

if (error) {
    logErrorAndExit(error);
}

const isDevelopment = value.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    dotenv.config();
}

export default require("./app");

function logErrorAndExit (
    error: ValidationError
): void {
    new ProcessManager().exit(error);
}
