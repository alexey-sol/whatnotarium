import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const deleteUser: RequestHandler = async function (
    { params },
    response,
    next
): Promise<void> {
    try {
        const { id } = params;
        const result = await UserService.deleteUser(+id);
        sendResponse(response, result);
    } catch (error) {
        next(error);
    }
};

export default deleteUser;
