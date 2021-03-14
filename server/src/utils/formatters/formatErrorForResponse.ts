import getErrorMessage from "#utils/helpers/getErrorMessage";

function formatErrorForResponse (error: any = {}): unknown {
    const { additionalData, name } = error;
    const message = getErrorMessage(error);

    return {
        error: {
            additionalData,
            message,
            name
        }
    };
}

export default formatErrorForResponse;
