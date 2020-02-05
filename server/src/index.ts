import "module-alias/register";
import dotenv from "dotenv";

import { NODE_ENV } from "constants/env";
import PropsValidator from "utils/PropsValidator";
import terminateProcess from "utils/terminateProcess";

const environmentValidator = new PropsValidator(process.env);

const { error, value } = environmentValidator.validate(
    NODE_ENV
);

if (error) {
    console.error(error);
    terminateProcess();
}

const nodeEnv = value.NODE_ENV;

if (nodeEnv === "development") {
    dotenv.config();
}

export default require("./app");
