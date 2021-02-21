import { CREATED } from "http-status";
import { RequestHandler } from "express";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
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
        const { email, id } = await UserService.createUser(request.body);
        const { token } = await SupportService.createToken({
            typeId: CONFIRM,
            userId: id
        });

        userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token });
        sendResponse(response, null, CREATED);
    } catch (error) {
        next(error);
    }
};

export default postUser;
