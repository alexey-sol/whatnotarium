import { Response } from "express";

type SendResponse = (
    response: Response,
    data?: unknown,
    statusCode?: number
) => Response;

const sendResponse: SendResponse = function (
    response: Response,
    data?: unknown,
    statusCode = 200
): Response {
    return response
        .status(statusCode)
        .send(data);
};

export default sendResponse;
