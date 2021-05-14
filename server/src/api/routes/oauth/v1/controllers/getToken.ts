import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";
import OauthService from "#services/OauthService/v1";
import sendResponse from "#utils/http/sendResponse";

const getToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { provider } = request.params;
    const code = request.query.code as string;

    let user;
    let currentUser;

    try {
        switch (provider) {
            case "yandex":
                user = await OauthService.signUpViaYandex(code);
                break;
        }

        if (user) {
            currentUser = await SessionService.createSession(request, user.email);
        }

        sendResponse(response, currentUser);
    } catch (error) {
        next(error);
    }
};

export default getToken;
