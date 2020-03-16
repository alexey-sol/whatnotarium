import translateError from "common/utils/translateError";

function getTranslatedReducerError (reducerError) {
    return translateError(reducerError?.message);
}

export default getTranslatedReducerError;
