class AppError extends Error {
  constructor(message, httpStatusCode) {
    super(message);
    this.httpStatusCode = httpStatusCode;
    this.name = "AppError";
  }
}

module.exports = AppError;
