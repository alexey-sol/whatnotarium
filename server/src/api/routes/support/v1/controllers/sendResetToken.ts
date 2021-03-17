import { RequestHandler } from "express";

import { RESET } from "#utils/const/database/userTokenTypeIds";
import { SEND_RESET_PASSWORD_EMAIL } from "#utils/const/events/user";
import SupportService from "#services/SupportService/v1";
import User from "#models/User";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

const sendResetToken: RequestHandler = async (
    request,
    response
): Promise<void> => {
    const user = response.locals.user as User;
    const { email, id } = user;

    const { token: newToken } = await SupportService.createToken({
        typeId: RESET,
        userId: id
    });

    userEmitter.emit(SEND_RESET_PASSWORD_EMAIL, { email, token: newToken });
    sendResponse(response, null);
};

export default sendResetToken;
