import { RequestHandler } from "express";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
import SupportService from "#services/SupportService/v1";
import UserToken from "#models/UserToken";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

interface UserTokenWithIncludedUser extends UserToken {
    user: { email: string };
}

const sendConfirmToken: RequestHandler = async (
    request,
    response
): Promise<void> => {
    const { user, userId } = response.locals.userToken as UserTokenWithIncludedUser;
    const { email } = user;

    const { token: newToken } = await SupportService.createToken({
        typeId: CONFIRM,
        userId
    });

    userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token: newToken });
    sendResponse(response, null);
};

export default sendConfirmToken;
