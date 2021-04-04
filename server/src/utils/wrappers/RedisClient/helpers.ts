import { Request } from "express";

export function createKey (request: Request): string {
    const { method, originalUrl } = request;
    return `${method} ${originalUrl}`;
}

export function stringifyValue (value: unknown): string {
    return (typeof value === "string")
        ? value
        : JSON.stringify(value);
}
