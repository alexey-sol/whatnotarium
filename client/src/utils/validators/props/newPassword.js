import * as yup from "yup";

import {
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "utils/resources/text/ru/validationErrors";

export default yup
    .string()
    .required(PASSWORD_EMPTY)
    .min(6, PASSWORD_TOO_WEAK);
