import { UNAUTHORIZED } from "#utils/const/validationErrors";
import ServerError from "./ServerError";

class UnauthorizedError extends ServerError {
    constructor (
        message = UNAUTHORIZED,
        ip?: string
    ) {
        super(message, 401, ip);
        this.name = this.constructor.name;
    }
}

export default UnauthorizedError;
