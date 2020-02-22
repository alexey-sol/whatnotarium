import { Request, Response, NextFunction } from "express";

import ApiController from "types/ApiController";
import UnauthorizedError from "utils/errors/UnauthorizedError";
import User from "models/User";
import sendResponse from "utils/sendResponse";
import sessionConfig from "config/session";

const getSession: ApiController = async function (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> {
    const { name } = sessionConfig;

    try {
        const isSignedIn = (
            request.session &&
            request.session.user &&
            request.cookies &&
            request.cookies[name]
        );

        if (!isSignedIn) {
            return next(new UnauthorizedError(undefined, request.ip));
        }

        const { id } = request.session!.user;
        const user = await User.findById(id);

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default getSession;
