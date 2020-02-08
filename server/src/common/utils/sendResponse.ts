import { Response } from "express";

type SendResponse = (
    response: Response,
    data?: any,
    statusCode?: number  
) => Response;

const sendResponse: SendResponse = function (
    response: Response,
    data?: any,
    statusCode: number = 200
): Response {
    return response
        .status(statusCode)
        .send(data);
}

export default sendResponse;
