import * as yup from "yup";

import email from "../props/email";
import password from "../props/password";

export default yup.object({
    email,
    password
});
