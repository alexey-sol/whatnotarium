import { RequestHandler } from "express";
import User from "#models/User";
import UserService from "#services/UserService/v1"
import sendResponse from "#utils/http/sendResponse";

const resetPassword: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { newPassword } = request.body;
    const { id } = response.locals.user as User;

    try {
        const user = await UserService.updateUser(id, { newPassword });
        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default resetPassword;
