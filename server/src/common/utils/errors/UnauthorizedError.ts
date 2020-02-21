import ServerError from "./ServerError";

class UnauthorizedError extends ServerError {
    constructor (
        message = "Unauthorized",
        ip?: string
    ) {
        super(message, 401, ip);
        this.name = this.constructor.name;
    }
}

export default UnauthorizedError;
