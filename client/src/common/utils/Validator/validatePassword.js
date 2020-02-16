import {
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "common/constants/validationErrors";

function validatePassword (password = "", isSignUp) {
    if (password.length === 0) {
        return PASSWORD_EMPTY;
    } else if (isSignUp && password.length < 6) {
        return PASSWORD_TOO_WEAK;
    } else {
        return null;
    }
}

export default validatePassword;
