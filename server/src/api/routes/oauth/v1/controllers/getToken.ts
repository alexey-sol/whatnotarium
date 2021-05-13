import { RequestHandler } from "express";
import status from "http-status";

import OauthError from "#utils/errors/OauthError";
import OauthService from "#services/OauthService/v1";
import sendResponse from "#utils/http/sendResponse";

const getToken: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    const { provider } = request.params;
    const code = request.query.code as string;
    let providerResponse;

    try {
        switch (provider) {
            case "yandex":
                providerResponse = await OauthService.requestTokenInYandex(code);
                break;
        }

        const error = typeof providerResponse === "object" && providerResponse.error;
        const accessToken = typeof providerResponse === "object" && providerResponse.access_token;

        if (error) {
            throw new OauthError(error as string, status.BAD_REQUEST, request.ip);
        } else if (accessToken) {
            // create user
            // create session
        }

        sendResponse(response);
    } catch (error) {
        next(error);
    }
};

export default getToken;
