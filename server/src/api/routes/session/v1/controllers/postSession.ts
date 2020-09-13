import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const postSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { email } = request.body;

    try {
        const usersList = await UserService.findUsers({
            where: { email }
        });

        const user = usersList.items[0];
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
