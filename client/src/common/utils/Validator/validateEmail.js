import {
    EMAIL_EMPTY,
    EMAIL_INVALID
} from "common/constants/validationErrors";

function validateEmail (email = "") {
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line
    const normalizedEmail = `${email}`.toLowerCase();
    const isValid = emailRegExp.test(normalizedEmail);

    if (email.length === 0) {
        return EMAIL_EMPTY;
    } else if (!isValid) {
        return EMAIL_INVALID;
    } else {
        return null;
    }
}

export default validateEmail;
