import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH
} from "common/constants/validationErrors";

function validateConfirmPassword (password = "", confirmPassword = "") {
    if (confirmPassword.length === 0) {
        return CONFIRM_PASSWORD_EMPTY;
    } else if (password && password !== confirmPassword) {
        return CONFIRM_PASSWORD_NOT_MATCH;
    } else {
        return null;
    }
}

export default validateConfirmPassword;
