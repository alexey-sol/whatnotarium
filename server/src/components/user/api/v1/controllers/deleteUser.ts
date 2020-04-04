import { RequestHandler } from "express";

import User from "user/model";
import sendResponse from "utils/http/sendResponse";

const deleteUser: RequestHandler = async function (
    { params },
    response,
    next
): Promise<void> {
    try {
        const { id } = params;
        const result = await User.destroyById(+id);
        sendResponse(response, result);
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
