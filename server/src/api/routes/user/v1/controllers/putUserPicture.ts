import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const putUserPicture: RequestHandler = async (
    { file, params },
    response,
    next
): Promise<void> => {
    const { id } = params;

    UserService.updateUserPicture(+id, file)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default putUserPicture;
