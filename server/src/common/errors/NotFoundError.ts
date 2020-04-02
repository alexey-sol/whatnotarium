import ServerError from "./ServerError";

class NotFoundError extends ServerError {
    constructor (
        message = "Not found",
        ip?: string
    ) {
        super(message, 404, ip);
        this.name = this.constructor.name;
    }
}

export default NotFoundError;
