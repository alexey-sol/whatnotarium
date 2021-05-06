import { RequestHandler } from "express";

import RequestSession from "#utils/wrappers/RequestSession";
import SessionService from "#services/SessionService/v1";

const deleteSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const session = new RequestSession(request);
        const sessionUser = session.getUserFromSession();

        if (sessionUser) {
            response.locals.cacheKey = `user-${sessionUser.id}`;
            response.locals.data = await SessionService.deleteSession(request, response);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default deleteSession;
