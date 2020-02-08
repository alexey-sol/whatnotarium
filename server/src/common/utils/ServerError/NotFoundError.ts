import ServerError from "./ServerError";

class NotFoundError extends ServerError {
    constructor(ip?: string) {
        const message = "Not found";
        super(message, 404, ip);
        this.name = this.constructor.name;
    }
}

export default NotFoundError;
