import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const postUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const user = await UserService.createUser(request.body);

        const session = new RequestSession(request);
        session.attachUserToSession(user);

        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default postUser;
