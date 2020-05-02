import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import User from "#models/User";
import sendResponse from "#utils/http/sendResponse";

const postSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { email } = request.body;

    try {
        const user = await User.findOne({
            where: { email }
        }) as User;

        const session = new RequestSession(request);

        if (!session.isAuthed()) {
            session.attachUserToSession(user);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default postSession;
