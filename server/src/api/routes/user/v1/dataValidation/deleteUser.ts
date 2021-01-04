import { RequestHandler } from "express";
import status from "http-status";

import { FORBIDDEN, NOT_FOUND } from "#utils/const/validationErrors";
import RequestSession from "#utils/helpers/RequestSession";
import User from "#models/User";
import UserError from "#utils/errors/UserError";

const deleteUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, params } = request;
    const { id } = params;

    try {
        const user = await User.findById(+id);

        if (!user) {
            throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        const session = new RequestSession(request);

        if (!session.isPermittedUser(user.id)) {
            throw new UserError(FORBIDDEN, status.FORBIDDEN, ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
