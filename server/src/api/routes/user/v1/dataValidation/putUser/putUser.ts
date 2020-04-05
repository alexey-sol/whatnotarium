import { RequestHandler } from "express";

import { INVALID_PASSWORD, NOT_FOUND } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";

const putUser: RequestHandler = async function (
    { body, ip, params },
    response,
    next
): Promise<void> {
    const { id } = params;

    try {
        const user = await User.findById(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, 404, ip);
        }

        const { currentPassword, newPassword } = body;

        if (currentPassword && newPassword) {
            const passwordIsValid = await isValidPassword(
                currentPassword,
                user
            );

            if (!passwordIsValid) {
                throw new UserError(INVALID_PASSWORD, 403, ip);
            }
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default putUser;
