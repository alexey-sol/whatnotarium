import status from "http-status";

import { UNAUTHORIZED } from "#utils/const/validationErrors";
import ServerError from "./ServerError";
import Indexer from "#types/Indexer";

class UnauthorizedError extends ServerError {
    constructor (
        message = UNAUTHORIZED,
        ip?: string,
        additionalData?: Indexer<unknown>
    ) {
        super(message, status.UNAUTHORIZED, ip, additionalData);
        this.name = this.constructor.name;
    }
}

export default UnauthorizedError;
