import { RequestHandler } from "express";
import morgan from "morgan";

import logger from "utils/logger";

type InitMorgan = () => RequestHandler;

const initMorgan: InitMorgan = function (): RequestHandler {
    return morgan("combined", getMorganOptions());
};

export default initMorgan;

function getMorganOptions (): morgan.Options {
    return {
        stream: {
            write: (message): void => {
                logger.info(message);
            }
        }
    };
}
