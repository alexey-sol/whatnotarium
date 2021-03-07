import { RequestHandler } from "express";

import SessionService from "#services/SessionService/v1";
import sendResponse from "#utils/http/sendResponse";

const deleteSession: RequestHandler = async (
    request,
    response,
    next
): Promise<void> => {
    SessionService.deleteSession(request, response)
        .then(user => sendResponse(response, user))
        .catch(next);
};

export default deleteSession;
