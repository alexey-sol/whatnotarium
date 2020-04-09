import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import Joi from "@hapi/joi";

import isOfType from "#utils/typeGuards/isOfType";
import logger from "#logger";

const logError: ErrorRequestHandler = (
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
): void => {
    const isJoiValidationError = isOfType<Joi.ValidationError>(error, "isJoi");

    if (isJoiValidationError) {
        error.statusCode = 400; // eslint-disable-line
    }

    logger.error(error);
    next(error);
};

export default logError;
