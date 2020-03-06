import { RequestHandler } from "express";
import morgan from "morgan";

import logger from "utils/winston";

type CreateMorgan = () => RequestHandler;

const createMorgan: CreateMorgan = function (): RequestHandler {
    return morgan("combined", getMorganOptions());
};

export default createMorgan;

function getMorganOptions (): morgan.Options {
    return {
        stream: {
            write: (message): void => {
                logger.info(message);
            }
        }
    };
}
