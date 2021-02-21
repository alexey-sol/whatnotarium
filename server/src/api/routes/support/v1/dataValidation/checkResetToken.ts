import { RequestHandler } from "express";

import ResetToken from "#models/ResetToken";
import serverConfig from "#config/server";

const checkResetToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { query } = request;
    const token = query.token as string;

    try {
        const tokenIsValid = await ResetToken.isValidToken(token);

        if (!tokenIsValid) {
            return response.redirect(`${serverConfig.url}/support/reset-token-error`);
        }

        next();
    } catch (error) {
        next(error);
    }
};

export default checkResetToken;
