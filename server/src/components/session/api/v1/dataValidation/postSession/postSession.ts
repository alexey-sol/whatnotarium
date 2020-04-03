import { RequestHandler } from "express";

import { INVALID_CREDENTIALS } from "const/validationErrors";
import User from "user/model";
import UserError from "errors/UserError";
import isValidPassword from "utils/helpers/isValidPassword";

const postSession: RequestHandler = async function (
    { body, ip },
    response,
    next
): Promise<void> {
    const { currentPassword, email } = body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            throw new UserError(INVALID_CREDENTIALS, 403, ip);
        }

        const passwordIsValid = await isValidPassword(currentPassword, user);

        if (!passwordIsValid) {
            throw new UserError(INVALID_CREDENTIALS, 403, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default postSession;
