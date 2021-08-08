import * as yup from "yup";

import confirmPassword from "../props/confirmPassword";
import email from "../props/email";
import name from "../props/name";
import password from "../props/newPassword";

export default yup.object({
    confirmPassword,
    email,
    name,
    password
});
