import { PASSWORD_EMPTY } from "common/constants/validationErrors";

function validateCurrentPassword (password = "") {
    if (password.length === 0) {
        return PASSWORD_EMPTY;
    } else {
        return null;
    }
}

export default validateCurrentPassword;
