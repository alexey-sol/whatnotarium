import { Response } from "express";

function sendResponse (
    response: Response,
    data?: unknown,
    statusCode = 200
): Response {
    return response
        .status(statusCode)
        .send(data);
}

export default sendResponse;
