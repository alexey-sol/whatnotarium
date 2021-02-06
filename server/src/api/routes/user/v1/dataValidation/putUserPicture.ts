import { RequestHandler } from "express";
import status from "http-status";

import { CONFLICT, FORBIDDEN, NOT_FOUND } from "#utils/const/validationErrors";
import RequestSession from "#utils/helpers/RequestSession";
import User from "#models/User";
import UserError from "#utils/errors/UserError";

const putUserPicture: RequestHandler = async (
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
        } else if (!user.isConfirmed) {
            throw new UserError(CONFLICT, status.CONFLICT, ip);
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

export default putUserPicture;
