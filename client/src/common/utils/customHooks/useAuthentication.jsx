import { useState } from "react";

import {
    CONFIRM_PASSWORD,
    EMAIL,
    NAME,
    PASSWORD
} from "common/constants/credentialProps";

import {
    validateConfirmPassword,
    validateEmail,
    validateName,
    validatePassword
} from "common/utils/Validator";

import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import discardFalsyValues from "common/utils/discardFalsyValues";
import isEmptyObject from "common/utils/isEmptyObject";
import translateError from "common/utils/translateError";

function useAuthentication (
    initialCredentials,
    initialErrors,
    sendCredentials,
    isSignUp
) {
    const [credentials, setCredentials] = useState(initialCredentials);
    const [errors, setErrors] = useState(initialErrors);
    const [errorCodes, setErrorCodes] = useState(initialErrors);

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
            const errorCode = validateValue(stateName, credentials);

            if (errorCode) {
                errorCodes[stateName] = errorCode;
            }
        }

        const hasErrors = !isEmptyObject(errors);

        return (hasErrors)
            ? errorCodes
            : null;
    };

    const validateValue = (stateName, credentials) => {
        const { confirmPassword, email, name, password } = credentials;

        switch (stateName) {
            case CONFIRM_PASSWORD:
                return validateConfirmPassword(password, confirmPassword);
            case EMAIL:
                return validateEmail(email);
            case NAME:
                return validateName(name);
            case PASSWORD:
                return validatePassword(password, isSignUp);
        }
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
            setErrorCodes(initialErrors);
            setErrors(initialErrors);
            if (callback) callback();
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
