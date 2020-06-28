import { NOT_FOUND } from "#utils/const/validationErrors";
import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import UserError from "#utils/errors/UserError";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const getSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const session = new RequestSession(request);
        const sessionUser = session.getUserFromSession();

        let user = null;

        if (sessionUser) {
            user = await UserService.findUser(sessionUser.id);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default getSession;
