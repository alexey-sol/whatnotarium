function formatReducerError (error, fieldNames = []) {
    let key = null;

    if (!error) {
        return null;
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
        [key]: error
    };
}

export default formatReducerError;
