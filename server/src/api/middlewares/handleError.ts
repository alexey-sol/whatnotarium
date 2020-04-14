import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import { INTERNAL_SERVER_ERROR } from "http-status";

import formatErrorForResponse from "#utils/formatters/formatErrorForResponse";
import sendResponse from "#utils/http/sendResponse";

const handleError: ErrorRequestHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    if (response.headersSent) {
        return next(error);
    }
    sendResponse(
        response,
        formatErrorForResponse(error),
        error.statusCode || INTERNAL_SERVER_ERROR
    );
};

export default handleError;
