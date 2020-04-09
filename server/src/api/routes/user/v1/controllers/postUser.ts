import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const postUser: RequestHandler = async (
    { body },
    response,
    next
): Promise<void> => {
    UserService.postUser(body)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default postUser;
