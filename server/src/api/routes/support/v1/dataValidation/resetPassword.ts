import { RequestHandler } from "express";
import status from "http-status";

import { FORBIDDEN, NOT_FOUND } from "#utils/const/validationErrors";
import UserToken from "#models/UserToken";
import UserTokenError from "#utils/errors/UserTokenError";
import User from "#models/User";
import UserError from "#utils/errors/UserError";

const resetPassword: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { body, ip } = request;
    const token = body.token as string;

    try {
        const userToken = await UserToken.findOne({
            where: { token }
        });

        if (!userToken) {
            throw new UserTokenError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        const tokenIsValid = userToken.isValidToken();

        if (!tokenIsValid) {
            throw new UserTokenError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        const user = await User.findById(userToken?.userId);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default resetPassword;
