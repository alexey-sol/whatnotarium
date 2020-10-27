class Notification {
    constructor (text, type, timeoutInMs = null) {
        this.text = text;
        this.type = type;
        this.timeoutInMs = timeoutInMs;
    }
}

export default Notification;
