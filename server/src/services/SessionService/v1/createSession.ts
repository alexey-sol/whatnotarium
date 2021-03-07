import { Request } from "express";

import UserItem from "#types/user/Item";
import UserService from "#services/UserService/v1";
import RequestSession from "#utils/helpers/RequestSession";

export default async function (
    request: Request
): Promise<UserItem> {
    const { email } = request.body;

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
