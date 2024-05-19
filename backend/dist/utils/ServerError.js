export default class ServerError extends Error {
    statusCode;
    options;
    constructor(statusCode, message, options) {
        super(message);
        this.statusCode = statusCode;
        this.options = options;
    }
}
//# sourceMappingURL=ServerError.js.map