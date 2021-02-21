import { FORBIDDEN } from "http-status";
import { RequestHandler } from "express";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { INVALID_CREDENTIALS } from "#utils/const/validationErrors";
import User from "#models/User";
import UserToken from "#models/UserToken";
import UserError from "#utils/errors/UserError";
import isValidPassword from "#utils/helpers/isValidPassword";
import serverConfig from "#config/server";

const { url } = serverConfig;

const postSession: RequestHandler = async (
    { body, ip },
    response,
    next
): Promise<void> => {
    const { email, password } = body;

    try {
        const user = await User.findOne({
            where: { email }
        });

        if (!user) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        const passwordIsValid = await isValidPassword(password, user.id);

        if (!passwordIsValid) {
            throw new UserError(INVALID_CREDENTIALS, FORBIDDEN, ip);
        }

        if (!user.isConfirmed) {
            const where = {
                typeId: CONFIRM,
                userId: user.id
            };

            const confirmToken = await UserToken.findOne({ where });
            return response.redirect(`${url}/support/confirm-token-error/${confirmToken?.token}`);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default postSession;
