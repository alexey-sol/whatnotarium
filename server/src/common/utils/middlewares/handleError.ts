import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import formatErrorForResponse from "@common/utils/helpers/formatErrorForResponse"; // eslint-disable-line
import sendResponse from "@common/utils/helpers/sendResponse";

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
