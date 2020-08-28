import * as yup from "yup";

import {
    CONFIRM_PASSWORD_EMPTY,
    CONFIRM_PASSWORD_NOT_MATCH
} from "utils/resources/text/ru/validationErrors";

import { PASSWORD } from "utils/const/userData";

export default yup
    .string()
    .oneOf([yup.ref(PASSWORD)], CONFIRM_PASSWORD_NOT_MATCH)
    .required(CONFIRM_PASSWORD_EMPTY);
