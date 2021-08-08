import * as yup from "yup";

import email from "../props/email";
import name from "../props/name";

export default yup.object({
    email,
    name
});
