import { ValidationResult } from "@hapi/joi";

import {
    PG_DATABASE_DEV,
    PG_DATABASE_PROD,
    PG_HOST,
    PG_PORT,
    PG_USER,
    PG_PASSWORD
} from "constants/env";

import { DATABASE } from "constants/componentNames";
import { PRODUCTION } from "constants/nodeEnv";
import ConfigFactory from "utils/ConfigFactory";
import DbConfig from "types/DbConfig";
import PropsValidator from "utils/PropsValidator";
import Validator from "types/Validator";
import getEnv from "utils/getEnv";
import terminateProcess from "utils/terminateProcess";

const envValidator = new PropsValidator(process.env);
const { error, value } = validateEnv(envValidator);

if (error) {
    console.error(error);
    terminateProcess();
}

const dbConfigFactory = new ConfigFactory<DbConfig>(DATABASE);
const config = dbConfigFactory.create(value);

export default config;

function validateEnv (
    validator: Validator
): ValidationResult {
    const isProduction = getEnv() === PRODUCTION;
    const appropriateDatabase = (isProduction)
        ? PG_DATABASE_PROD
        : PG_DATABASE_DEV;

    return validator.validate(
        appropriateDatabase,
        PG_HOST,
        PG_PASSWORD,
        PG_PORT,
        PG_USER
    );
}
