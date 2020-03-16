import { useState } from "react";

import deriveNewErrorsState from "common/utils/deriveNewErrorsState";
import discardFalsyValues from "common/utils/discardFalsyValues";
import isEmptyObject from "common/utils/isEmptyObject";
import translateError from "common/utils/translateError";

function useAuthentication (
    initialProps,
    initialErrors,
    validateProp,
    sendProps
) {
    const [props, setProps] = useState(initialProps);
    const [errors, setErrors] = useState(initialErrors);
    const [errorCodes, setErrorCodes] = useState(initialProps);

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors = validate(props);
        setUpdatedErrors(errors);

        if (!errors) {
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

        const hasValidationErrors = !isEmptyObject(discardFalsyValues(errors));

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

    const getTranslatedErrors = (errorCodes) => {
        const translatedErrors = {};

        for (const [key, value] of Object.entries(errorCodes)) {
            translatedErrors[key] = translateError(value);
        }

        return translatedErrors;
    };

    const setUpdatedErrors = (updatedErrors) => {
        if (updatedErrors) {
            const newErrorsState = deriveNewErrorsState(updatedErrors);
            setErrorCodes(newErrorsState);
            setErrors(getTranslatedErrors(newErrorsState));
        } else {
            setErrorCodes(initialErrors);
            setErrors(initialErrors);
        }
    };

    return {
        props,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    };
};

export default useAuthentication;
