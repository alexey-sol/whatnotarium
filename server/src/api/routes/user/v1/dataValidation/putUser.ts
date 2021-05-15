import { RequestHandler } from "express";
import status from "http-status";

import {
    CONFLICT,
    FORBIDDEN,
    INVALID_PASSWORD,
    NOT_FOUND
} from "#utils/const/validationErrors";

import RequestSession from "#utils/wrappers/RequestSession";
import UserError from "#utils/errors/UserError";
import UserService from "#services/UserService/v1";
import isValidPassword from "#utils/helpers/isValidPassword";

const putUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { body, ip, params } = request;
    const { id } = params;

    try {
        const user = await UserService.findUser(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        let shouldThrowConflict = !user.isConfirmed;
        const { email } = body;
        const isNewEmail = email && user.email !== email;

        if (isNewEmail) {
            const anotherUserWithSameEmail = (await UserService.findUsers({
                where: { email }
            })).items[0];

            if (anotherUserWithSameEmail) {
                shouldThrowConflict = true;
            }
        }

        if (shouldThrowConflict) {
            throw new UserError(CONFLICT, status.CONFLICT, ip);
        }

        const session = new RequestSession(request);

        if (!session.isPermittedUser(user.id)) {
            throw new UserError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        const { newPassword, password } = body;

        if (password && newPassword) {
            const passwordIsValid = user.hasPassword && await isValidPassword(password, user.id);

            if (!passwordIsValid) {
                throw new UserError(INVALID_PASSWORD, status.UNAUTHORIZED, ip);
            }
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default putUser;
