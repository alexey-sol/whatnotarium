import { RequestHandler } from "express";

import querySchema from "./schemas/query";
import serverConfig from "#config/server";

const checkResetToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { error, value } = querySchema.validate(request.query);

    if (error) {
        return response.redirect(`${serverConfig.url}/support/reset-token-error`);
    }

    request.query = value;
    next();
};

export default checkResetToken;
