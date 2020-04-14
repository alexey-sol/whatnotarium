import status from "http-status";

import { UNAUTHORIZED } from "#utils/const/validationErrors";
import ServerError from "./ServerError";

class UnauthorizedError extends ServerError {
    constructor (
        message = UNAUTHORIZED,
        ip?: string
    ) {
        super(message, status.UNAUTHORIZED, ip);
        this.name = this.constructor.name;
    }
}

export default UnauthorizedError;
