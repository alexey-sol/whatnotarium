import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import UserService from "#services/UserService/v1";
import sendResponse from "#utils/http/sendResponse";
import serverConfig from "#config/server";
import User from "#models/User";

const confirmEmail: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { query, params } = request;
    const { token } = query;

    // check expDate
    // const isValidToken = await ConfirmToken.isValidConfirmToken(+params.id)
    //
    // if (!isValidToken) {
    //     return response.redirect(`${serverConfig.url}/confirm-token/error`);
    // }

    const user = await User.findById(+params.id);

    if (user) {
        const session = new RequestSession(request);
        session.attachUserToSession(user);
    }

    response.redirect(`${serverConfig.url}`);

    // UserService.findUser(+id)
    //     .then(user => sendResponse(response, user))
    //     .catch(next);
};

export default confirmEmail;
