import { UNAUTHORIZED } from "common/constants/serverErrors";
import translateError from "common/utils/translateError";

const errorsToIgnore = [
    UNAUTHORIZED
];

function translateReducerError (reducerError) {
    const { message } = reducerError || {};
    const isErrorToIgnore = errorsToIgnore
        .find((errorToIgnore) => errorToIgnore === message);

    return (isErrorToIgnore)
        ? null
        : translateError(message);
}

export default translateReducerError;
