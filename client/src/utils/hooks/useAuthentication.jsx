import { useCallback, useEffect, useState } from "react";

import deriveNewErrorsState from "utils/helpers/deriveNewErrorsState";
import filterFalsyValues from "utils/helpers/filterFalsyValues";
import isEmptyObject from "utils/helpers/isEmptyObject";
import translateError from "utils/helpers/translateError";

function useAuthentication ({
    initialErrors = {},
    initialProps = {},
    resetReducerError,
    sendProps,
    validateProp
}) {
    const [props, setProps] = useState(initialProps);
    const [errors, setErrors] = useState(initialErrors);
    const [errorCodes, setErrorCodes] = useState(initialProps);
    const errorValues = [...Object.values(initialErrors)];

    const validate = (propsToCheck) => {
        const newErrorCodes = {};

        for (const stateName of Object.keys(propsToCheck)) {
            const errorCode = validateProp(stateName, propsToCheck);

            if (errorCode) {
                newErrorCodes[stateName] = errorCode;
            }
        }

        const hasErrors = !isEmptyObject(newErrorCodes);

        return (hasErrors)
            ? newErrorCodes
            : null;
    };

    const translateErrors = (errorCodesToTranslate) => {
        const translatedErrors = {};
        const entries = Object.entries(errorCodesToTranslate);

        for (const [key, value] of entries) {
            translatedErrors[key] = translateError(value);
        }

        return translatedErrors;
    };

    const setUpdatedErrors = useCallback((newErrors) => {
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

        if (newErrors) {
            updateErrorsState(newErrors);
        } else {
            resetErrorsState();
        }
    }, [...errorValues, resetReducerError]); // eslint-disable-line

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

    useEffect(() => {
        setUpdatedErrors(initialErrors);
    }, [...errorValues, setUpdatedErrors]); // eslint-disable-line

    return {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    };
}

export default useAuthentication;
