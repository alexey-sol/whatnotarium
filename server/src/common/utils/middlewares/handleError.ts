import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import formatErrorForResponse from "utils/formatErrorForResponse";
import sendResponse from "utils/sendResponse";

const handleError: ErrorRequestHandler = function (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    if (response.headersSent) {
        return next(error);
    }
    sendResponse(
        response,
        formatErrorForResponse(error),
        error.statusCode || 500
    );
};

export default handleError;
