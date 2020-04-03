import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import Joi from "@hapi/joi";

import isOfType from "utils/typeGuards/isOfType";
import logger from "config/logger";

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
