import { ValidationError } from "@hapi/joi";

import isOfType from "utils/isOfType";

type GetErrorMessage = (
    error: Error & ValidationError
) => string;

const getErrorMessage: GetErrorMessage = function (
    error: Error & ValidationError
) {
    const isJoiValidationError = isOfType<ValidationError>(error, "isJoi");

    return (isJoiValidationError)
        ? error.details[0].message
        : error.message;
};

export default getErrorMessage;
