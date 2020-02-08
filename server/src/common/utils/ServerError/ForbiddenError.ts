import ServerError from "./ServerError";

class ForbiddenError extends ServerError {
    constructor(ip?: string) {
        const message = "Forbidden";
        super(message, 403, ip);
        this.name = this.constructor.name;
    }
}

export default ForbiddenError;
