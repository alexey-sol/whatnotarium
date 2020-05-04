import {
    EMAIL_OCCUPIED,
    INVALID_CREDENTIALS,
    INVALID_PASSWORD,
    NO_USER_FOUND
} from "utils/const/serverErrors";

import {
    EMAIL,
    PASSWORD
} from "utils/const/userData";

function getErrorFromResponse (response = {}) {
    const error = response.response?.body?.error;
    return formatServerError(error);
}

export default getErrorFromResponse;

function formatServerError (error = {}) {
    const { message, ...rest } = error;

    const isEmailField = (
        message === EMAIL_OCCUPIED ||
        message === INVALID_CREDENTIALS ||
        message === NO_USER_FOUND
    );

    const isPasswordField = (
        message === INVALID_PASSWORD
    );

    let key = "";

    if (isEmailField) {
        key = EMAIL;
    } else if (isPasswordField) {
        key = PASSWORD;
    }

    let formattedError = null;

    if (key) {
        formattedError = { ...rest };
        formattedError.message = {};
        formattedError.message[key] = message;
    }

    return formattedError || error;
}
