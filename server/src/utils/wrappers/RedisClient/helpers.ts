export function createKey (originalUrl: string): string {
    // Take a string like "/api/v1/post", "/api/v1/post/vote", or "/api/v1/admin/post"
    // and turn it into "post-13". It's expected that the URL has ID as a param.
    const splittedUrl = originalUrl.split("/");
    const shouldRemovePostfixAction = !Number(splittedUrl[splittedUrl.length - 1]);

    if (shouldRemovePostfixAction) {
        splittedUrl.pop();
    }

    return splittedUrl.splice(-2).join("-");
}

export function stringifyValue (value: unknown): string {
    return (typeof value === "string")
        ? value
        : JSON.stringify(value);
}
