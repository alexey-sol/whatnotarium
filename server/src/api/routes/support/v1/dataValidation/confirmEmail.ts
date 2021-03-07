import { RequestHandler } from "express";
import status from "http-status";

import { FORBIDDEN } from "#utils/const/validationErrors";
import UserToken from "#models/UserToken";
import UserTokenError from "#utils/errors/UserTokenError";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, body } = request;
    const token = body.token as string;

    try {
        const tokenIsValid = await UserToken.isValidToken(token);

        if (!tokenIsValid) {
            throw new UserTokenError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
