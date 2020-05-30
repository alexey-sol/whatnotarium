import { useCallback, useEffect, useState } from "react";

import deriveNewErrorsState from "utils/helpers/deriveNewErrorsState";
import filterFalsyValues from "utils/helpers/filterFalsyValues";
import isEmptyObject from "utils/helpers/isEmptyObject";
import translateError from "utils/helpers/translateError";

function useForm ({
    initialErrors = {},
    initialFields = {},
    resetReducerError,
    sendFields,
    validateField
}) {
    const [fields, setFields] = useState(initialFields);
    const [errors, setErrors] = useState(initialErrors);
    const [errorCodes, setErrorCodes] = useState(initialFields);
    const errorValues = [...Object.values(initialErrors)];

    const validate = (fieldsToCheck) => {
        const newErrorCodes = {};

        for (const stateName of Object.keys(fieldsToCheck)) {
            const errorCode = validateField(stateName, fieldsToCheck);

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

        const validationErrors = validate(fields);
        setUpdatedErrors(validationErrors);

        if (!validationErrors) {
            sendFields(fields);
        }
    };

    const handleInputChange = ({ target }) => {
        const { name, value } = target;

        const newFields = {
            ...fields,
            [name]: value
        };

        setFields(newFields);

        const hasValidationErrors = !isEmptyObject(filterFalsyValues(errors));

        if (hasValidationErrors) {
            const updatedErrors = validate(newFields);
            setUpdatedErrors(updatedErrors);
        }
    };

    useEffect(() => {
        setUpdatedErrors(initialErrors);
    }, [...errorValues, setUpdatedErrors]); // eslint-disable-line

    return {
        fields,
        errorCodes,
        errors,
        handleInputChange,
        handleSubmit
    };
}

export default useForm;
