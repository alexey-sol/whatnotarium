abstract class ServerError extends Error {
    constructor (
        message: string,
        private statusCode: number = 500,
        private ip?: string
    ) {
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.ip = ip;
    }
}

export default ServerError;
