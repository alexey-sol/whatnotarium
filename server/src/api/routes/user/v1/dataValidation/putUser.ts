import { RequestHandler } from "express";
import status from "http-status";

import {
    CONFLICT,
    FORBIDDEN,
    INVALID_PASSWORD,
    NOT_FOUND
} from "#utils/const/validationErrors";

import RequestSession from "#utils/wrappers/RequestSession";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";

const putUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { body, ip, params } = request;
    const { id } = params;

    try {
        const user = await User.findById(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        } else if (!user.isConfirmed) {
            throw new UserError(CONFLICT, status.CONFLICT, ip);
        }

        const session = new RequestSession(request);

        if (!session.isPermittedUser(user.id)) {
            throw new UserError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        const { newPassword, password } = body;

        if (password && newPassword) {
            const passwordIsValid = await isValidPassword(password, user.id);

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
