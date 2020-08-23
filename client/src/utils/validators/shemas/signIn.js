import * as yup from "yup";

import {
    EMAIL_EMPTY,
    EMAIL_INVALID,
    PASSWORD_EMPTY
} from "utils/resources/text/ru/validationErrors";

export default yup.object({
    email: yup
        .string()
        .required(EMAIL_EMPTY)
        .email(EMAIL_INVALID),

    password: yup
        .string()
        .required(PASSWORD_EMPTY)
});
