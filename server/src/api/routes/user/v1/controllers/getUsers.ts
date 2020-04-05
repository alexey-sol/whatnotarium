import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const getUsers: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    UserService.getUsers()
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
