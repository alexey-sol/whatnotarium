import { PASSWORD_EMPTY } from "utils/const/validationErrors";

function validateCurrentPassword (password = "") {
    if (password.length === 0) {
        return PASSWORD_EMPTY;
    } else {
        return null;
    }
}

export default validateCurrentPassword;
