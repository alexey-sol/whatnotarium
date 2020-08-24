import * as yup from "yup";

import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH,
    EMAIL_EMPTY,
    EMAIL_INVALID,
    NAME_EMPTY,
    NAME_TOO_LONG,
    NAME_TOO_SHORT,
    PASSWORD_EMPTY,
    PASSWORD_TOO_WEAK
} from "utils/resources/text/ru/validationErrors";

export default yup.object({
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], CONFIRM_PASSWORD_NOT_MATCH)
        .required(CONFIRM_PASSWORD_EMPTY),

    email: yup
        .string()
        .required(EMAIL_EMPTY)
        .email(EMAIL_INVALID),

    name: yup
        .string()
        .required(NAME_EMPTY)
        .min(3, NAME_TOO_SHORT)
        .max(30, NAME_TOO_LONG),

    password: yup
        .string()
        .required(PASSWORD_EMPTY)
        .min(6, PASSWORD_TOO_WEAK)
});
