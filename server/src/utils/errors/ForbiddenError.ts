import status from "http-status";

import { FORBIDDEN } from "#utils/const/validationErrors";
import ServerError from "./ServerError";

class ForbiddenError extends ServerError {
    constructor (
        message = FORBIDDEN,
        ip?: string
    ) {
        super(message, status.FORBIDDEN, ip);
        this.name = this.constructor.name;
    }
}

export default ForbiddenError;
