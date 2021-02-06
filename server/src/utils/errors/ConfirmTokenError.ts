import ModelError from "./ModelError";

class ConfirmTokenError extends ModelError {
    constructor (
        message: string,
        statusCode: number,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default ConfirmTokenError;
