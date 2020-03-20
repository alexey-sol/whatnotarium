import getErrorMessage from "./getErrorMessage";

type FormatErrorMessage = (error: any) => unknown;

const formatErrorForResponse: FormatErrorMessage = function (
    error: any = {}
): unknown {
    const { name } = error;
    const message = getErrorMessage(error);

    return {
        error: {
            message,
            name
        }
    };
};

export default formatErrorForResponse;
