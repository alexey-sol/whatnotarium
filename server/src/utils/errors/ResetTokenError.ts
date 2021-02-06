import ModelError from "./ModelError";

class ResetTokenError extends ModelError {
    constructor (
        message: string,
        statusCode: number,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default ResetTokenError;
