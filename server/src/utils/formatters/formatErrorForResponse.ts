import getErrorMessage from "#utils/helpers/getErrorMessage";

function formatErrorForResponse (error: any = {}): unknown {
    const { name } = error;
    const message = getErrorMessage(error);

    return {
        error: {
            message,
            name
        }
    };
}

export default formatErrorForResponse;
