import { RequestHandler } from "express";
import status from "http-status";

import { CONFIRM } from "#utils/const/database/userTokenTypeIds";
import { CONFLICT, NOT_FOUND } from "#utils/const/validationErrors";
import { USERS } from "#utils/const/database/tableNames";
import User from "#models/User";
import UserError from "#utils/errors/UserError";
import UserToken from "#models/UserToken";
import UserTokenError from "#utils/errors/UserTokenError";

const sendConfirmToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { ip, query } = request;

    if (query.email) {
        query.email = decodeURIComponent(query.email as string);
    } else if (query.token) {
        query.token = decodeURIComponent(query.token as string);
    }

    const email = query.email as string;
    const token = query.token as string;

    try {
        let user = null;

        if (email) {
            user = await User.findOne({ where: { email } });

            if (!user) {
                throw new UserError(NOT_FOUND, status.NOT_FOUND, ip);
            } else if (user.isConfirmed) {
                throw new UserTokenError(CONFLICT, status.CONFLICT, ip);
            }
        }

        let where;

        if (token) {
            where = { token, typeId: CONFIRM };
        } else if (email && user) {
            where = { userId: user.id };
        }

        const include = [{
            as: "user",
            attributes: ["email"],
            referencedKey: "id",
            ownKey: "userId",
            tableName: USERS
        }];

        const userToken = await UserToken.findOne({ include, where });

        if (!userToken) {
            throw new UserTokenError(NOT_FOUND, status.NOT_FOUND, ip);
        }

        response.locals.userToken = userToken;
        next();
    } catch (error) {
        next(error);
    }
};

export default sendConfirmToken;
