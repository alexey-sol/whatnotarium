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
        if (params.id) {
            const key = redisClient.createKey(originalUrl, params as unknown as ParamsWithId);
            await redisClient.delete(key);
        }

        sendResponse(response, response.locals.data);
    } catch (error) {
        next(error);
    }
};

export default clearRouteCache;
