import {
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT
} from "common/constants/validationErrors";

function validateName (name = "") {
    if (name.length === 0) {
        return NAME_EMPTY;
    } else if (name.length < 3) {
        return NAME_TOO_SHORT;
    } else if (name.length > 30) {
        return NAME_TOO_LONG;
    } else {
        return null;
    }
}

export default validateName;
