import { RequestHandler } from "express";
import status from "http-status";

import { INVALID_PASSWORD, NOT_FOUND } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";

const putUser: RequestHandler = async (
    { body, ip, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        const user = await User.findById(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        const { newPassword, password } = body;

        if (password && newPassword) {
            const passwordIsValid = await isValidPassword(
                password,
                user.id
            );

            if (!passwordIsValid) {
                throw new UserError(INVALID_PASSWORD, status.UNAUTHORIZED, ip);
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default putUser;
