import { NO_REQUIRED_PROPS } from "constants/validationErrors";
import ServerError from "./ServerError";

class ValidationError extends ServerError {
    constructor (
        message = NO_REQUIRED_PROPS,
        statusCode = 400,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default ValidationError;
