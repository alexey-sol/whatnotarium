import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import RequestSession from "utils/RequestSession";
import UnauthorizedError from "utils/errors/UnauthorizedError";
import User from "models/User";
import sendResponse from "utils/sendResponse";

const getSession: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const session = new RequestSession(request);

    try {
        const isSignedIn = session.userIsSignedIn();

        if (!isSignedIn) {
            return next(new UnauthorizedError(undefined, request.ip));
        }

        const sessionUser = session.getUser();
        let user = null;

        if (sessionUser) {
            user = await User.findById(sessionUser.id);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default getSession;
