import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import isJoiValidationError from "utils/isJoiValidationError";
import logger from "utils/winston";

const logErrors: ErrorRequestHandler = function (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    if (isJoiValidationError(error)) {
        error.statusCode = 400;
    }

    logger.error(error);
    next(error);
};

export default logErrors;
