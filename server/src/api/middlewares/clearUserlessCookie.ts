import {
    RequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import RequestSession from "#utils/helpers/RequestSession";
import config from "#config";

const clearUserlessCookie: RequestHandler = function (
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const { name } = config.session;
    const session = new RequestSession(request);

    if (session.cookieExistsButHasNoUser()) {
        response.clearCookie(name);
    }

    next();
};

export default clearUserlessCookie;
