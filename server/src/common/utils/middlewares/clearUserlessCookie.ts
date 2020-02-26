import {
    RequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import RequestSession from "utils/RequestSession";
import sessionConfig from "config/session";

const clearUserlessCookie: RequestHandler = function (
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const { name } = sessionConfig;
    const session = new RequestSession(request);

    if (session.cookieExistsButHasNoUser()) {
        response.clearCookie(name);
    }

    next();
};

export default clearUserlessCookie;
