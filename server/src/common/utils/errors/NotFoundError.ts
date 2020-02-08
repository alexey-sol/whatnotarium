import ServerError from "./ServerError";

class NotFoundError extends ServerError {
    constructor(
        message: string = "Not found",
        ip?: string
    ) {
        super(message, 404, ip);
        this.name = this.constructor.name;
    }
}

export default NotFoundError;
