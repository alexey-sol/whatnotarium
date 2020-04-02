import { Request, Response } from "express";

import ApiController from "@common/types/ApiController";
import RequestSession from "@common/utils/helpers/RequestSession";
import sendResponse from "@common/utils/helpers/sendResponse";
import sessionConfig from "@config/session";

const deleteSession: ApiController = async function (
    request: Request,
    response: Response
): Promise<void> {
    const { name } = sessionConfig;
    const session = new RequestSession(request);

    if (session.userIsSignedIn()) {
        response.clearCookie(name);
    }

    sendResponse(response);
};

export default deleteSession;
