import * as yup from "yup";

import confirmNewPassword from "../props/confirmNewPassword";
import newPassword from "../props/newPassword";

export default yup.object({
    confirmNewPassword,
    newPassword
});
