import { ValidationError } from "@hapi/joi";

import isJoiValidationError from "utils/isJoiValidationError";

type GetErrorMessage = (
    error: Error & ValidationError
) => string;

const getErrorMessage: GetErrorMessage = function (
    error: Error & ValidationError
) {
    return (isJoiValidationError(error))
        ? error.details[0].message
        : error.message;
}

export default getErrorMessage;
