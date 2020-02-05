import "module-alias/register";
import dotenv from "dotenv";

import { DEVELOPMENT } from "constants/nodeEnv";
import { NODE_ENV } from "constants/env";
import PropsValidator from "utils/PropsValidator";
import terminateProcess from "utils/terminateProcess";

const envValidator = new PropsValidator(process.env);

const { error, value } = envValidator.validate(
    NODE_ENV
);

if (error) {
    console.error(error);
    terminateProcess();
}

const nodeEnv = value.NODE_ENV;

if (nodeEnv === DEVELOPMENT) {
    dotenv.config();
}

export default require("./app");
