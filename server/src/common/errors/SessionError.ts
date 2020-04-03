import ServerError from "./ServerError";

class SessionError extends ServerError {
    constructor (
        message: string,
        statusCode: number,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default SessionError;
