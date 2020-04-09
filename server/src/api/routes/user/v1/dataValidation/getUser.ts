import { RequestHandler } from "express";

import { NOT_FOUND } from "#utils/const/validationErrors";
import User from "#models/User";
import UserError from "#utils/errors/UserError";

const getUser: RequestHandler = async (
    { ip, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    try {
        const user = await User.findById(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, 404, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default getUser;
