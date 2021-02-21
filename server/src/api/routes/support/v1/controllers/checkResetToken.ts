import { RequestHandler } from "express";

import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";
import serverConfig from "#config/server";

const checkResetToken: RequestHandler = async (
    { query, params },
    response,
    next
): Promise<void> => {
    const { token } = query;
    const { id } = params;


    // redirect to
    response.redirect(`${serverConfig.url}/.../${token}`);

    // UserService.findUser(+id)
    //     .then(user => sendResponse(response, user))
    //     .catch(next);
};

export default checkResetToken;
