import { RequestHandler } from "express";

import UserToken from "#models/UserToken";
import serverConfig from "#config/server";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { query } = request;
    const token = query.token as string;

    try {
        const tokenIsValid = await UserToken.isValidToken(token);

        if (!tokenIsValid) {
            return response.redirect(`${serverConfig.url}/support/confirm-token-error/${token}`);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default confirmEmail;
