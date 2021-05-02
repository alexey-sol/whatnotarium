import {
    Request,
    Response,
    NextFunction,
    RequestHandler
} from "express";

import ParamsWithId from "#types/ParamsWithId";
import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const readRouteCache: RequestHandler = async (
    { originalUrl, params }: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (params.id) {
            const key = redisClient.createKey(originalUrl, params as unknown as ParamsWithId);
            const cachedData = await redisClient.get(key);

            if (cachedData) {
                sendResponse(response, cachedData);
                return;
            }
        }
    } catch (error) {
        return next(error);
    }

    next();
};

export default readRouteCache;
