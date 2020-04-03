import { RequestHandler } from "express";

import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const getUsers: RequestHandler = async function (
    request,
    response,
    next
): Promise<void> {
    User.find()
        .then(users => sendResponse(response, users))
        .catch(next);
};

export default getUsers;
