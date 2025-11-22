export class AppError extends Error {
    statusCode: number;
    details?: unknown;
    constructor(message: string, statusCode = 400, details?: unknown) {
        super(message);
        this.statusCode = statusCode;
        this.details = details;
        Error.captureStackTrace(this, this.constructor); // stack trace düzgün görünsün
    }
}
