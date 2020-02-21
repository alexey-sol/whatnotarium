import { useState } from "react";

import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import discardFalsyValues from "common/utils/discardFalsyValues";
import isEmptyObject from "common/utils/isEmptyObject";
import translateError from "common/utils/translateError";

function useAuthentication (
    initialCredentials,
    validateCredential,
    sendCredentials
) {
    const [credentials, setCredentials] = useState(initialCredentials);
    const [errors, setErrors] = useState(initialCredentials);
    const [errorCodes, setErrorCodes] = useState(initialCredentials);

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(credentials);
        setUpdatedErrors(errors, sendCredentials);
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        const newCredentials = {
            ...credentials,
            [name]: value
        };

        setCredentials(newCredentials);

        const hasValidationErrors = !isEmptyObject(discardFalsyValues(errors));

        if (hasValidationErrors) {
            const updatedErrors = validate(newCredentials);
            setUpdatedErrors(updatedErrors);
        }
    };

    const validate = (credentials) => {
        const errorCodes = {};

        for (const stateName of Object.keys(credentials)) {
            const errorCode = validateCredential(stateName, credentials);

            if (errorCode) {
                errorCodes[stateName] = errorCode;
            }
        }

        const hasErrors = !isEmptyObject(errorCodes);

        return (hasErrors)
            ? errorCodes
            : null;
    };

    const getTranslatedErrors = (errorCodes) => {
        const translatedErrors = {};

        for (const [key, value] of Object.entries(errorCodes)) {
            translatedErrors[key] = translateError(value);
        }

        return translatedErrors;
    };

    const setUpdatedErrors = (updatedErrors, callback) => {
        if (updatedErrors) {
            const newErrorsState = deriveNewErrorsState(updatedErrors);
            setErrorCodes(newErrorsState);
            setErrors(getTranslatedErrors(newErrorsState));
        } else {
            setErrorCodes(initialCredentials);
            setErrors(initialCredentials);
            if (callback) callback(credentials);
        }
    };

    return {
        credentials,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    };
};

export default useAuthentication;
