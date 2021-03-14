import { Request } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";

export default async function (
    request: Request,
    email: string
): Promise<UserItem> {
    const usersList = await UserService.findUsers({
        where: { email }
    });

    const user = usersList.items[0];
    const session = new RequestSession(request);

    if (!session.isAuthed()) {
        session.attachUserToSession(user);
    }

    return user;
}
