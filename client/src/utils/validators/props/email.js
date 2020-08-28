import * as yup from "yup";

import {
    EMAIL_EMPTY,
    EMAIL_INVALID
} from "utils/resources/text/ru/validationErrors";

export default yup
    .string()
    .required(EMAIL_EMPTY)
    .email(EMAIL_INVALID);
