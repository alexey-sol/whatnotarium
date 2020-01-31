import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH
} from "constants/validationErrors";

function validateConfirmPassword (password = "", confirmPassword = "") {
    if (confirmPassword.length === 0) {
        return CONFIRM_PASSWORD_EMPTY;
    } else if (password !== confirmPassword) {
        return CONFIRM_PASSWORD_NOT_MATCH;
    }
}

export default validateConfirmPassword;
