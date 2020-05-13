function getErrorFromResponse (response = {}) {
    const isError = Boolean(response.response?.error);

    return (isError)
        ? JSON.parse(getResponseText(response))?.error
        : null;
}

export default getErrorFromResponse;

function getResponseText (response) {
    return response?.response?.text || "";
}
