import { RequestHandler } from "express";

import { NOT_FOUND } from "const/validationErrors";
import User from "user/model";
import UserError from "errors/UserError";

const deleteUser: RequestHandler = async function (
    { ip, params },
    response,
    next
): Promise<void> {
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

export default deleteUser;
