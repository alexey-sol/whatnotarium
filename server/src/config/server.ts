import PropsValidator from "utils/PropsValidator";
import terminateProcess from "utils/terminateProcess";

const propsValidator = new PropsValidator();

const { error, value } = propsValidator.validateObject(
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
