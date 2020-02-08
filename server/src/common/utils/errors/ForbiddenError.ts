import ServerError from "./ServerError";

class ForbiddenError extends ServerError {
    constructor(
        message: string = "Forbidden",
        ip?: string
    ) {
        super(message, 403, ip);
        this.name = this.constructor.name;
    }
}

export default ForbiddenError;
