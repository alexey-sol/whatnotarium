import { RequestHandler } from "express";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
import { USERS } from "#utils/const/database/tableNames";
import SupportService from "#services/SupportService/v1";
import UserToken from "#models/UserToken";
import sendResponse from "#utils/http/sendResponse";
import userEmitter from "#events/user";

interface UserTokenWithIncludedEmail extends UserToken {
    email: string;
}

const sendConfirmToken: RequestHandler = async (
    request,
    response
): Promise<void> => {
    const { query } = request;
    const token = query.token as string;

    const include = [{
        as: "user",
        attributes: ["email"],
        referencedKey: "id",
        ownKey: "userId",
        tableName: USERS
    }];

    const { email, userId } = await UserToken.findOne({
        include,
        where: { token }
    }) as UserTokenWithIncludedEmail;

    const { token: newToken } = await SupportService.createToken({
        typeId: CONFIRM,
        userId
    });

    userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token: newToken });
    sendResponse(response, null);
};

export default sendConfirmToken;
