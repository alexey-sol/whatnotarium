abstract class ServerError extends Error {
    constructor (
        message: string,
        private statusCode: number,
        private ip?: string
    ) {
        super(message);
        this.name = this.constructor.name;
        this.ip = ip;
    }
}

export default ServerError;
