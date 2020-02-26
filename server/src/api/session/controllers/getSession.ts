import { Request, Response, NextFunction } from "express";

import { USERS } from "constants/dbTableNames";
import ApiController from "types/ApiController";
import BaseModel from "models/BaseModel";
import RequestSession from "utils/RequestSession";
import UnauthorizedError from "utils/errors/UnauthorizedError";
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
            user = await BaseModel.findById(USERS, sessionUser.id);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default getSession;
