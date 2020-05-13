import { OUT_OF_FIELD } from "utils/const/fieldErrors";

function formatReducerError (error, fieldNames = []) {
    let key = OUT_OF_FIELD;

    if (!error) {
        return getObjectEnsuringConstantDepsSize(key);
    }

    const { message = "" } = error;

    const existingFieldName = fieldNames.find(fieldName => {
        const upperCasedFieldName = fieldName?.toUpperCase();

        return message
            .toUpperCase()
            .includes(upperCasedFieldName);
    });

    if (existingFieldName) {
        key = existingFieldName;
    }

    return {
        [key]: error?.message
    };
}

export default formatReducerError;

function getObjectEnsuringConstantDepsSize (key) {
    return {
        [key]: ""
    };
}
