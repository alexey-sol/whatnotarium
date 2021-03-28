import { RequestHandler } from "express";
import SessionService from "#services/SessionService/v1";
import User from "#models/User";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { email, id } = response.locals.user as User;

    try {
        await UserService.updateUser(id, { isConfirmed: true });
        const currentUser = await SessionService.createSession(request, email);
        sendResponse(response, currentUser);
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
