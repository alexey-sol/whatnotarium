import {
    Request,
    Response,
    NextFunction,
    RequestHandler
} from "express";

import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const readRouteCache: RequestHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const key = redisClient.createKey(request);
        const cachedData = await redisClient.get(key);

        if (cachedData) {
            sendResponse(response, cachedData);
            return;
        }
    } catch (error) {
        return next(error);
    }

    next();
};

export default readRouteCache;
