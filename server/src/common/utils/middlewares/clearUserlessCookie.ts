import {
    RequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import sessionConfig from "config/session";

const clearUserlessCookie: RequestHandler = function (
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const { name } = sessionConfig;

    const isCookieUseless = (
        request.cookies[name] &&
        request.session &&
        !request.session.user
    );

    if (isCookieUseless) {
        response.clearCookie(name);
    }

    next();
};

export default clearUserlessCookie;
