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

    const isCookieUserless = (
        request.cookies &&
        request.cookies[name] &&
        request.session &&
        !request.session.user
    );

    if (isCookieUserless) {
        response.clearCookie(name);
    }

    next();
};

export default clearUserlessCookie;
