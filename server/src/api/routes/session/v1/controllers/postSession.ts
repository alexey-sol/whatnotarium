import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";

const postSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const { email } = request.body;
        const user = await SessionService.createSession(request, email);

        response.locals.cacheKey = `user-${user.id}`;
        response.locals.data = user;
        next();
    } catch (error) {
        next(error);
    }
};

export default postSession;
