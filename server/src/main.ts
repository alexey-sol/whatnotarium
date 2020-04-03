import "module-alias/register";
import Joi from "@hapi/joi";
import dotenv from "dotenv";

import { DEVELOPMENT } from "const/nodeEnv";
import ProcessManager from "utils/helpers/ProcessManager";
import validateEnv from "utils/validators/validateEnv";

const { error, value } = validateEnv();

if (error) {
    logErrorAndExit(error);
}

const isDevelopment = value.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    dotenv.config();
}

export default require("./config/app");

function logErrorAndExit (
    error: Joi.ValidationError
): void {
    new ProcessManager().exit(error);
}
