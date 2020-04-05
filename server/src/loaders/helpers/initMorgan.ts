import { RequestHandler } from "express";
import morgan from "morgan";

import logger from "#logger";

export default function (): RequestHandler {
    return morgan("combined", getMorganOptions());
}

function getMorganOptions (): morgan.Options {
    return {
        stream: {
            write: (message): void => {
                logger.info(message);
            }
        }
    };
}
