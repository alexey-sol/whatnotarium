import { PASSWORD_EMPTY } from "utils/const/validationErrors";

function validatePassword (password = "") {
    if (password.length === 0) {
        return PASSWORD_EMPTY;
    } else {
        return null;
    }
}

export default validatePassword;
