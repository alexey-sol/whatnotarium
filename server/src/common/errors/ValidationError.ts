import { INVALID_PROPS } from "const/validationErrors";
import ServerError from "./ServerError";

class ValidationError extends ServerError {
    constructor (
        message = INVALID_PROPS,
        statusCode = 400,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default ValidationError;
