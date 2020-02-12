import ServerError from "./ServerError";

class PropsError extends ServerError {
    constructor (
        message = "Has no required properties",
        statusCode = 400
    ) {
        super(message, statusCode);
        this.name = this.constructor.name;
    }
}

export default PropsError;
