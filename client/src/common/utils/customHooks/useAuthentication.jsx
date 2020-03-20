import { useEffect, useState } from "react";

import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import filterFalsyValues from "common/utils/filterFalsyValues";
import isEmptyObject from "common/utils/isEmptyObject";
import translateError from "common/utils/translateError";

function useAuthentication ({
    initialProps = {},
    initialErrors = {},
    resetReducerError,
    sendProps,
    validateProp
}) {
    const [props, setProps] = useState(initialProps);
    const [errors, setErrors] = useState(initialErrors);
    const [errorCodes, setErrorCodes] = useState(initialProps);

    const handleSubmit = (event) => {
        event.preventDefault();

        const validationErrors = validate(props);
        setUpdatedErrors(validationErrors);

        if (!validationErrors) {
            sendProps(props);
        }
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        const newProps = {
            ...props,
            [name]: value
        };

        setProps(newProps);

        const hasValidationErrors = !isEmptyObject(filterFalsyValues(errors));

        if (hasValidationErrors) {
            const updatedErrors = validate(newProps);
            setUpdatedErrors(updatedErrors);
        }
    };

    const validate = (props) => {
        const errorCodes = {};

        for (const stateName of Object.keys(props)) {
            const errorCode = validateProp(stateName, props);

            if (errorCode) {
                errorCodes[stateName] = errorCode;
            }
        }

        const hasErrors = !isEmptyObject(errorCodes);

        return (hasErrors)
            ? errorCodes
            : null;
    };

    const translateErrors = (errorCodes) => {
        const translatedErrors = {};

        for (const [key, value] of Object.entries(errorCodes)) {
            translatedErrors[key] = translateError(value);
        }

        return translatedErrors;
    };

    const setUpdatedErrors = (updatedErrors) => {
        if (updatedErrors) {
            updateErrorsState(updatedErrors);
        } else {
            resetErrorsState();
        }
    };

    const updateErrorsState = (updatedErrors) => {
        const newErrorsState = deriveNewErrorsState(updatedErrors);
        setErrorCodes(newErrorsState);
        setErrors(translateErrors(newErrorsState));
    };

    const resetErrorsState = () => {
        setErrorCodes(initialErrors);
        setErrors(initialErrors);
        if (resetReducerError) resetReducerError();
    };

    useEffect(() => {
        setUpdatedErrors(initialErrors);
    }, getDependenciesFrom(initialErrors));

    return {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    };
};

export default useAuthentication;

function getDependenciesFrom (object = {}) {
    return [...Object.values(object)];
}
