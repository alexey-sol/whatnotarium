import { RequestHandler } from "express";

import UserToken from "#models/UserToken";
import User from "#models/User";
import serverConfig from "#config/server";

const confirmEmail: RequestHandler = async (
    request,
    response
): Promise<void> => {
    const { query } = request;
    const token = query.token as string;

    const { userId } = await UserToken.findOne({
        where: { token }
    }) as UserToken;

    const user = await User.findById(userId) as User;
    await user.updateAttributes({ isConfirmed: true });

    response.redirect(`${serverConfig.url}`);
};

export default confirmEmail;
