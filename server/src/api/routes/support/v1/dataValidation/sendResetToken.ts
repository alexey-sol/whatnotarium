import { RequestHandler } from "express";
import status from "http-status";

import { NOT_FOUND } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";

const sendResetToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, body } = request;
    const email = body.email as string;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default sendResetToken;
