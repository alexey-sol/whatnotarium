import { FORBIDDEN } from "http-status";
import { RequestHandler } from "express";

import { INVALID_CREDENTIALS } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";

const postSession: RequestHandler = async (
    { body, ip },
    response,
    next
): Promise<void> => {
    const { email, password } = body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        const passwordIsValid = await isValidPassword(password, user.id);

        if (!passwordIsValid) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default postSession;
