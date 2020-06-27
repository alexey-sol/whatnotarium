import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const putUser: RequestHandler = async (
    { body, file, params },
    response,
    next
): Promise<void> => {
    const { id } = params;
    console.log(file)
    UserService.updateUser(+id, body)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default putUser;
