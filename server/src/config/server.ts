import PropsValidator from "utils/PropsValidator";
import terminateProcess from "utils/terminateProcess";

const environmentValidator = new PropsValidator(process.env);

const { error, value } = environmentValidator.validate(
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
