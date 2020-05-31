import {
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT
} from "utils/const/validationErrors";

import { USER_ERROR } from "utils/const/errorNames";

function validateName (name = "") {
    if (name.length === 0) {
        return {
            message: NAME_EMPTY,
            name: USER_ERROR
        };
    } else if (name.length < 3) {
        return {
            message: NAME_TOO_SHORT,
            name: USER_ERROR
        };
    } else if (name.length > 30) {
        return {
            message: NAME_TOO_LONG,
            name: USER_ERROR
        };
    } else {
        return null;
    }
}

export default validateName;
