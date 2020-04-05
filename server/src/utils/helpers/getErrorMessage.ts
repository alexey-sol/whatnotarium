import Joi from "@hapi/joi";

import isOfType from "#utils/typeGuards/isOfType";

function getErrorMessage (
    error: Error & Joi.ValidationError
): string {
    const isJoiValidationError = isOfType<Joi.ValidationError>(error, "isJoi");

    return (isJoiValidationError)
        ? error.details[0].message
        : error.message;
}

export default getErrorMessage;
