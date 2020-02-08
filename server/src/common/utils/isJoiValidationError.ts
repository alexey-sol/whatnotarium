import { ValidationError } from "@hapi/joi";

import { VALIDATION_ERROR } from "constants/errorNames";

type IsJoiValidationError = (
    error: Error & ValidationError
) => boolean;

const isJoiValidationError: IsJoiValidationError = function (
    error: Error & ValidationError
): boolean {
    return error.isJoi && error.name === VALIDATION_ERROR;
};

export default isJoiValidationError;
