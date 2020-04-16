import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import sessionConfig from "#config/session";
import sendResponse from "#utils/http/sendResponse";

const deleteSession: RequestHandler = async (
    request,
    response
): Promise<void> => {
    const { name } = sessionConfig;
    const session = new RequestSession(request);

    if (session.isAuthed()) {
        response.clearCookie(name);
    }

    sendResponse(response);
};

export default deleteSession;