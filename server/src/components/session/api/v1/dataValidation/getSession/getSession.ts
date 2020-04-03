import { RequestHandler } from "express";

import { UNAUTHORIZED } from "const/validationErrors";
import RequestSession from "utils/helpers/RequestSession";
import SessionError from "errors/SessionError";

const getSession: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    try {
        const session = new RequestSession(request);
        const isSignedIn = session.userIsSignedIn();

        if (!isSignedIn) {
            throw new SessionError(UNAUTHORIZED, 401, request.ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default getSession;
