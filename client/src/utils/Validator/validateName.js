import {
    NAME_EMPTY,
    NAME_TOO_LONG
} from "constants/validationErrors";

function validateName (name = "") {
    if (name.length === 0) {
        return NAME_EMPTY;
    } else if (name.length > 50) {
        return NAME_TOO_LONG;
    }
}

export default validateName;
