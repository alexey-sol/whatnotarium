import { RequestHandler } from "express";

import OauthService from "#services/OauthService/v1";
import sendResponse from "#utils/http/sendResponse";

const getToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { provider } = request.params;
    const code = request.query.code as string;

    try {
        switch (provider) {
            case "yandex":
                await OauthService.signUpViaYandex(code);
                break;
        }

        sendResponse(response);
    } catch (error) {
        next(error);
    }
};

export default getToken;
