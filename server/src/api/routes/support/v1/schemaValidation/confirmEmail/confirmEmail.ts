import { RequestHandler } from "express";

import querySchema from "./schemas/query";
import serverConfig from "#config/server";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { error, value } = querySchema.validate(request.query);

    if (error) {
        const { token } = request.query;
        return response.redirect(`${serverConfig.url}/support/confirm-token-error/${token}`);
    }

    request.query = value;
    next();
};

export default confirmEmail;
