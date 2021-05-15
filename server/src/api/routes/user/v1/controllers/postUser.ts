import { CREATED } from "http-status";
import { RequestHandler } from "express";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
import SessionService from "#services/SessionService/v1";
import SupportService from "#services/SupportService/v1";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

const postUser: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    try {
        const { skipConfirmEmail, ...rest } = request.body;

        const props = {
            ...rest,
            isConfirmed: Boolean(skipConfirmEmail)
        };

        const { email, id } = await UserService.createUser(props);
        let currentUser = null;

        if (skipConfirmEmail) {
            currentUser = await SessionService.createSession(request, email);
        } else {
            const { token } = await SupportService.createToken({
                typeId: CONFIRM,
                userId: id
            });

            userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token });
        }

        sendResponse(response, currentUser, CREATED);
    } catch (error) {
        next(error);
    }
};

export default postUser;
