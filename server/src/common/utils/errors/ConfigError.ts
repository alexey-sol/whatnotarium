import ServerError from "./ServerError";

class ConfigError extends ServerError {
    constructor (message = "Not able to create config") {
        super(message, 500);
        this.name = this.constructor.name;
    }
}

export default ConfigError;
