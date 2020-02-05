import { ValidationResult } from "@hapi/joi";

import {
    HOST,
    PORT,
    URL
} from "constants/env";

import { SERVER } from "constants/componentNames";
import ConfigFactory from "utils/ConfigFactory";
import PropsValidator from "utils/PropsValidator";
import ServerConfig from "types/ServerConfig";
import Validator from "types/Validator";
import terminateProcess from "utils/terminateProcess";

const envValidator = new PropsValidator(process.env);
const { error, value } = validateEnv(envValidator);

if (error) {
    console.error(error);
    terminateProcess();
}

const serverConfigFactory = new ConfigFactory<ServerConfig>(SERVER);
const config = serverConfigFactory.create(value);

export default config;

function validateEnv (
    validator: Validator
): ValidationResult {
    return validator.validate(
        HOST,
        PORT,
        URL
    );
}
