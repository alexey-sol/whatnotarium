import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";
import sendResponse from "#utils/http/sendResponse";

const getSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    SessionService.findSession(request)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default getSession;
