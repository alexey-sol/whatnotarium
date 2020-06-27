import { RequestHandler } from "express";

import { PROFILES } from "#utils/const/database/tableNames";
import RequestSession from "#utils/helpers/RequestSession";
import User from "#models/User";
import sendResponse from "#utils/http/sendResponse";

const postSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { email } = request.body;

    try {
        const include = [{
            as: "profile",
            attributes: ["name", "picture"],
            referencedKey: "userId",
            ownKey: "id",
            tableName: PROFILES
        }];

        const user = await User.findOne({
            include,
            where: { email }
        }) as User;

        delete user?.password;

        const session = new RequestSession(request);

        if (!session.isAuthed()) {
            session.attachUserToSession(user);
        }

        sendResponse(response, user);
    } catch (error) {
        return next(error);
    }
};

export default postSession;
