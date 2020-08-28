import * as yup from "yup";

import {
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT
} from "utils/resources/text/ru/validationErrors";

export default yup
    .string()
    .required(NAME_EMPTY)
    .min(3, NAME_TOO_SHORT)
    .max(30, NAME_TOO_LONG);
