import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";

const getSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const user = await SessionService.findSession(request);

        if (user) {
            response.locals.cacheKey = `user-${user.id}`;
            response.locals.data = user;
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default getSession;
