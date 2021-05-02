import {
    Request,
    Response,
    RequestHandler,
    NextFunction
} from "express";

import ParamsWithId from "#types/ParamsWithId";
import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const writeRouteCache: RequestHandler = async (
    { originalUrl, params }: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { data } = response.locals;

        if (params.id) {
            const key = redisClient.createKey(originalUrl, params as unknown as ParamsWithId);
            await redisClient.setEX(key, data);
        }

        sendResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export default writeRouteCache;
