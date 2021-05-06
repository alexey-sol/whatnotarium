import {
    Request,
    Response,
    RequestHandler,
    NextFunction
} from "express";

import ParamsWithId from "#types/ParamsWithId";
import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const clearRouteCache: RequestHandler = async (
    { originalUrl, params }: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { cacheKey } = response.locals;

        if (cacheKey || params.id) {
            const paramsWithId = params as unknown as ParamsWithId;
            const key = cacheKey || redisClient.createKey(originalUrl, paramsWithId);
            await redisClient.delete(key);
        }

        sendResponse(response, response.locals.data);
    } catch (error) {
        next(error);
    }
};

export default clearRouteCache;
