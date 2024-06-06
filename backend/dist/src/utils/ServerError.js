export default class ServerError extends Error {
    constructor(statusCode, message, options) {
        super(message);
        this.statusCode = statusCode;
        this.options = options;
    }
}
//# sourceMappingURL=ServerError.js.map