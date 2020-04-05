import { RequestHandler } from "express";

import { UNAUTHORIZED } from "#utils/const/validationErrors";
import RequestSession from "#utils/helpers/RequestSession";
import UnauthorizedError from "#utils/errors/UnauthorizedError";

const getSession: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    try {
        const session = new RequestSession(request);
        const isSignedIn = session.userIsSignedIn();

        if (!isSignedIn) {
            throw new UnauthorizedError(UNAUTHORIZED, request.ip);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default getSession;
