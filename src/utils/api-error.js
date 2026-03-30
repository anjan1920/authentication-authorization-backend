class ApiError extends Error {
  constructor(
    statusCode,
    message = null,   
    errors = null,  
    stack = "",
  ) {
    super(message || "");

    this.statusCode = statusCode;
    this.data = null;
    this.success = false;
    this.errors = errors;

    if (message) {
      this.message = message;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };