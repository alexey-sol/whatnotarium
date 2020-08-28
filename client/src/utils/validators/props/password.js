import * as yup from "yup";

import { PASSWORD_EMPTY } from "utils/resources/text/ru/validationErrors";

export default yup
    .string()
    .required(PASSWORD_EMPTY);
