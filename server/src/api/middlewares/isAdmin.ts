import { RequestHandler } from "express";

import { FORBIDDEN } from "#utils/const/validationErrors";
import ForbiddenError from "#utils/errors/ForbiddenError";
import RequestSession from "#utils/helpers/RequestSession";

const isAdmin: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const session = new RequestSession(request);

        if (!session.isAdmin()) {
            throw new ForbiddenError(FORBIDDEN, request.ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default isAdmin;
