import { RequestHandler, Request, Response } from "express";
import morgan from "morgan";

import logger from "#logger";

function initMorgan (): RequestHandler {
    return morgan("combined", getMorganOptions());
}

export default initMorgan;

function getMorganOptions (): morgan.Options<Request, Response> {
    return {
        stream: {
            write: (message): void => {
                logger.info(message);
            }
        }
    };
}
