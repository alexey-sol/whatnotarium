export function createKey (originalUrl: string): string {
    // Take a string like "/api/v1/post" or "/api/v1/admin/post" and turn it into
    // "post-13". It's expected that the URL has ID as a param.
    return originalUrl.split("/").splice(-2).join("-");
}

export function stringifyValue (value: unknown): string {
    return (typeof value === "string")
        ? value
        : JSON.stringify(value);
}
