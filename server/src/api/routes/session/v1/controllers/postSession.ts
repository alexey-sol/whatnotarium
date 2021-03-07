import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";
import sendResponse from "#utils/http/sendResponse";

const postSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    SessionService.createSession(request)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default postSession;
