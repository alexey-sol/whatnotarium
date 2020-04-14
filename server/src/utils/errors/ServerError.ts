import { INTERNAL_SERVER_ERROR } from "http-status";

abstract class ServerError extends Error {
    constructor (
        message: string,
        private statusCode: number = INTERNAL_SERVER_ERROR,
        private ip?: string
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.ip = ip;
    }
}

export default ServerError;
