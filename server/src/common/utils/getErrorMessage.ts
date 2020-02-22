import Joi from "@hapi/joi";

import isOfType from "utils/isOfType";

type GetErrorMessage = (
    error: Error & Joi.ValidationError
) => string;

const getErrorMessage: GetErrorMessage = function (
    error: Error & Joi.ValidationError
) {
    const isJoiValidationError = isOfType<Joi.ValidationError>(error, "isJoi");

    return (isJoiValidationError)
        ? error.details[0].message
        : error.message;
};

export default getErrorMessage;
