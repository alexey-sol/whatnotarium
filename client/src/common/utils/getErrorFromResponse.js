function getErrorFromResponse (response) {
    return response?.response?.body?.error;
}

export default getErrorFromResponse;
