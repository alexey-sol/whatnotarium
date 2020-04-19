import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const getUsers: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    UserService.findUsers()
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
