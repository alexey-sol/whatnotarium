import {
    ErrorRequestHandler,
    Request,
    Response,
    NextFunction
} from "express";

import Joi from "@hapi/joi";
import { UNPROCESSABLE_ENTITY } from "http-status";

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
        error.statusCode = UNPROCESSABLE_ENTITY; // eslint-disable-line
    }

    logger.error(error);
    next(error);
};

export default logError;
