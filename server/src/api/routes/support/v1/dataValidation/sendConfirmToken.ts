import { RequestHandler } from "express";
import status from "http-status";

import { NOT_FOUND } from "#utils/const/validationErrors";
import UserToken from "#models/UserToken";
import UserTokenError from "#utils/errors/UserTokenError";

const sendConfirmToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, query } = request;
    const token = query.token as string;

    try {
        const confirmToken = await UserToken.findOne({ where: { token } });

        if (!confirmToken) {
            throw new UserTokenError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default sendConfirmToken;
