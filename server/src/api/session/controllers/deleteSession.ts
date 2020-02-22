import { Request, Response } from "express";

import ApiController from "types/ApiController";
import sendResponse from "utils/sendResponse";
import sessionConfig from "config/session";

const deleteSession: ApiController = async function (
    request: Request,
    response: Response
): Promise<void> {
    const { name } = sessionConfig;

    const isSignedIn = (
        request.session &&
        request.session.user &&
        request.cookies &&
        request.cookies[name]
    );

    if (isSignedIn) {
        response.clearCookie(name);
    }

    sendResponse(response);
};

export default deleteSession;
