import {
    Request,
    Response,
    RequestHandler,
    NextFunction
} from "express";

import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const clearRouteCache: RequestHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const key = redisClient.createKey(request);
        await redisClient.delete(key);
        sendResponse(response, response.locals.data);
    } catch (error) {
        next(error);
    }
};

export default clearRouteCache;
