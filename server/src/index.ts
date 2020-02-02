import "module-alias/register";
import dotenv from "dotenv";

import JoiValidator from "utils/JoiValidator";

const validator = new JoiValidator();

const { error, value } = validator.validateObject(
    process.env,
    "NODE_ENV"
);

if (error) {
    throw error;
}

const nodeEnv = value.NODE_ENV;

if (nodeEnv === "development") {
    dotenv.config();
}

export default require("./app");
