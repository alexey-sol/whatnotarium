import ServerError from "#utils/errors/ServerError";

class OauthError extends ServerError {
    constructor (
        message: string,
        statusCode: number,
        ip?: string
    ) {
        super(message, statusCode, ip);
        this.name = this.constructor.name;
    }
}

export default OauthError;
