import Validator from "utils/Validator";
import terminateProcess from "utils/terminateProcess";

const validator = new Validator();

const { error, value } = validator.validateObject(
    process.env,
    "HOST",
    "PORT",
    "URL"
);

if (error) {
    console.error(error);
    terminateProcess();
}

const { HOST, PORT, URL } = value;

export const host = HOST;
export const port = PORT;
export const url = URL;
