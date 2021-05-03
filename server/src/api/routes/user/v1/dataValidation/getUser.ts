import { RequestHandler } from "express";
import status from "http-status";

import { NOT_FOUND } from "#utils/const/validationErrors";
import UserError from "#utils/errors/UserError";
import UserService from "#services/UserService/v1";

const getUser: RequestHandler = async (
    { ip, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        const user = await UserService.findUser(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default getUser;
