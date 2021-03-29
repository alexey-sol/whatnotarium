import {
    Request,
    Response,
    RequestHandler,
    NextFunction
} from "express";

import redisClient from "#redisClient";
import sendResponse from "#utils/http/sendResponse";

const writeRouteCache: RequestHandler = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { data } = response.locals;
        const key = redisClient.createKey(request);
        await redisClient.setEX(key, data);
        sendResponse(response, data);
    } catch (error) {
        next(error);
    }
};

export default writeRouteCache;
