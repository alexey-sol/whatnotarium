import ModelError from "./ModelError";

class UserTokenError extends ModelError {
    constructor (
        message: string,
        statusCode: number,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default UserTokenError;
