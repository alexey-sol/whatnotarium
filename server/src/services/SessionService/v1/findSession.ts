import { Request } from "express";

import RequestSession from "#utils/wrappers/RequestSession";
import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";

export default async function (
    request: Request
): Promise<UserItem | null> {
    const session = new RequestSession(request);
    const sessionUser = session.getUserFromSession();

    return (sessionUser)
        ? UserService.findUser(sessionUser.id)
        : null;
}
