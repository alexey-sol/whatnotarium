import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const getUser: RequestHandler = async function (
    { params },
    response,
    next
): Promise<void> {
    const { id } = params;

    UserService.getUser(+id)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getUser;
