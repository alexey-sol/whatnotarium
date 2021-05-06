import { Request } from "express";

import RequestSession from "#utils/wrappers/RequestSession";
import User from "#models/User";
import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";

export default async function (
    request: Request
): Promise<UserItem | null> {
    const session = new RequestSession(request);
    const sessionUser = session.getUserFromSession();

    if (sessionUser) {
        const user = await UserService.findUser(sessionUser.id);

        if (user) {
            await (user as User).updateAttributes({
                lastActivityDate: new Date()
            });
        }
    }

    return (sessionUser)
        ? UserService.findUser(sessionUser.id)
        : null;
}
