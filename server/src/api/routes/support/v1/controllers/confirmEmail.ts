import { RequestHandler } from "express";
import SessionService from "#services/SessionService/v1";
import User from "#models/User";
import sendResponse from "#utils/http/sendResponse";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const user = response.locals.user as User;
        await user.updateAttributes({ isConfirmed: true });
        const currentUser = await SessionService.createSession(request, user.email);
        sendResponse(response, currentUser);
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
