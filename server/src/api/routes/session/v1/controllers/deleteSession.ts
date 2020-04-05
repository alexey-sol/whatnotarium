import { RequestHandler } from "express";

import RequestSession from "#utils/helpers/RequestSession";
import sessionConfig from "#config/session";
import sendResponse from "#utils/http/sendResponse";

const deleteSession: RequestHandler = async function (
    request,
    response
): Promise<void> {
    const { name } = sessionConfig;
    const session = new RequestSession(request);

    if (session.userIsSignedIn()) {
        response.clearCookie(name);
    }

    sendResponse(response);
};

export default deleteSession;
