import { RequestHandler } from "express";
import status from "http-status";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { CONFLICT, FORBIDDEN, NOT_FOUND } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserToken from "#models/UserToken";
import UserTokenError from "#utils/errors/UserTokenError";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, body } = request;
    body.token = decodeURIComponent(body.token as string);

    const token = body.token as string;

    try {
        const userToken = await UserToken.findOne({
            where: { token, typeId: CONFIRM }
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
        } else if (user.isConfirmed) {
            throw new UserTokenError(CONFLICT, status.CONFLICT, ip);
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
