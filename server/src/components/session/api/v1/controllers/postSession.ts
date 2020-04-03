import { RequestHandler } from "express";

import RequestSession from "utils/helpers/RequestSession";
import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const postSession: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    const { email } = request.body;

    try {
        const user = await User.findOne({ email }) as User;
        const session = new RequestSession(request);

        if (!session.userIsSignedIn()) {
            session.assignUserToSession(user);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default postSession;
