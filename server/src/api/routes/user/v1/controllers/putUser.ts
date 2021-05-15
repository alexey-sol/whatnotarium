import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import SupportService from "#services/SupportService/v1";
import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import userEmitter from "#events/user";
import { SEND_CONFIRM_EMAIL } from "#utils/const/events/user";
import User from "#models/User";

const putUser: RequestHandler = async (
    { body, params },
    response,
    next
): Promise<void> => {
    try {
        const { id } = params;
        const { email } = body;
        const { email: oldEmail } = response.locals.user as User;
        const shouldSendConfirmEmail = email && email !== oldEmail;

        response.locals.data = await UserService.updateUser(+id, body);

        if (shouldSendConfirmEmail) {
            const { token } = await SupportService.createToken({
                typeId: CONFIRM,
                userId: +id
            });

            userEmitter.emit(SEND_CONFIRM_EMAIL, { email, token });
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default putUser;
