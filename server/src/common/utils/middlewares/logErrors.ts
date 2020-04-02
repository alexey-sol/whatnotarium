import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import Joi from "@hapi/joi";

import isOfType from "utils/isOfType";
import logger from "utils/logger";

const logErrors: ErrorRequestHandler = function (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void {
    const isJoiValidationError = isOfType<Joi.ValidationError>(error, "isJoi");

    if (isJoiValidationError) {
        error.statusCode = 400;
    }

    logger.error(error);
    next(error);
};

export default logErrors;
