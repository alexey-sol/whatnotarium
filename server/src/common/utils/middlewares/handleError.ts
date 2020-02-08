import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import getErrorMessage from "utils/getErrorMessage";
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

    const errorMessage = getErrorMessage(error);
    sendResponse(response, errorMessage, error.statusCode || 500);
};

export default handleError;
