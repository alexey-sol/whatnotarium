import "module-alias/register";
import dotenv from "dotenv";

import PropsValidator from "utils/PropsValidator";
import terminateProcess from "utils/terminateProcess";

const propsValidator = new PropsValidator();

const { error, value } = propsValidator.validateObject(
    process.env,
    "NODE_ENV"
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
