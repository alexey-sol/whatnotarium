import {
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "constants/validationErrors";

function validatePassword (password = "") {
    if (password.length === 0) {
        return PASSWORD_EMPTY;
    } else if (password.length < 6) {
        return PASSWORD_TOO_WEAK;
    }
}

export default validatePassword;
