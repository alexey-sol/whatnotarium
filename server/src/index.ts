import "module-alias/register";
import { ValidationError } from "@hapi/joi";
import dotenv from "dotenv";

import { DEVELOPMENT } from "constants/nodeEnv";
import { NODE_ENV } from "constants/env";
import PropsValidator from "utils/PropsValidator";
import logger from "utils/winston";
import terminateProcess from "utils/terminateProcess";

const envValidator = new PropsValidator(process.env);
const { error, value } = envValidator.validate(NODE_ENV);

if (error) {
    logErrorAndTerminateProcess(error);
}

const isDevelopment = value.NODE_ENV === DEVELOPMENT;

if (isDevelopment) {
    dotenv.config();
}

export default require("./app");

function logErrorAndTerminateProcess (
    error: ValidationError
): void {
    logger.error(error);
    terminateProcess();
}
