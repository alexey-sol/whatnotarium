import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH
} from "utils/const/validationErrors";

import { USER_ERROR } from "utils/const/errorNames";

function validateConfirmPassword (password = "", confirmPassword = "") {
    if (!password) {
        return null;
    }

    if (confirmPassword.length === 0) {
        return {
            message: CONFIRM_PASSWORD_EMPTY,
            name: USER_ERROR
        };
    } else if (password !== confirmPassword) {
        return {
            message: CONFIRM_PASSWORD_NOT_MATCH,
            name: USER_ERROR
        };
    } else {
        return null;
    }
}

export default validateConfirmPassword;
