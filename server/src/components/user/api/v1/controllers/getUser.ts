import { RequestHandler } from "express";

import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const getUser: RequestHandler = async function (
    { params },
    response,
    next
): Promise<void> {
    const { id } = params;

    User.findById(+id)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getUser;
