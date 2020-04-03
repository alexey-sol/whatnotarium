import { RequestHandler } from "express";

import RequestSession from "utils/helpers/RequestSession";
import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const getSession: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    try {
        const session = new RequestSession(request);
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
