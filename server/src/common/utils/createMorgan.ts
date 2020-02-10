import morgan from "morgan";

import logger from "utils/winston";

type CreateMorgan = () => any;

const createMorgan: CreateMorgan = function (): any {
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
