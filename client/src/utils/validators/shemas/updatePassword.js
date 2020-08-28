import * as yup from "yup";

import confirmNewPassword from "../props/confirmNewPassword";
import newPassword from "../props/newPassword";
import password from "../props/password";

export default yup.object({
    confirmNewPassword,
    newPassword,
    password
});
