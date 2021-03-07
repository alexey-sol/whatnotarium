import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";
import UserToken from "#models/UserToken";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { body } = request;
    const token = body.token as string;

    try {
        const { userId } = await UserToken.findOne({
            where: { token }
        }) as UserToken;

        await UserService.updateUser(userId, { isConfirmed: true });
        const user = await SessionService.createSession(request);

        sendResponse(response, user);
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
