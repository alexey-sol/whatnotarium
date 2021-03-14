import { INTERNAL_SERVER_ERROR } from "http-status";
import Indexer from "#types/Indexer";

abstract class ServerError extends Error {
    constructor (
        message: string,
        private statusCode: number = INTERNAL_SERVER_ERROR,
        private ip?: string,
        private additionalData?: Indexer<unknown>
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;

        if (ip) {
            this.ip = ip;
        }

        if (additionalData) {
            this.additionalData = additionalData;
        }
    }
}

export default ServerError;
