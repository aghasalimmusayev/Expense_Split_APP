import { ZodError } from "zod";
import { AppError } from "@utils/AppError";
import { logger } from "./logger";
export function errorHandler(err, req, res, next) {
    if (err instanceof ZodError) {
        return res.status(400).json({
            message: "Validation error",
            errors: err.errors.map(e => ({
                path: e.path.join("."),
                message: e.message
            }))
        });
    }
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            message: err.message,
            details: err.details ?? null
        });
    }
    logger.error({ err }, "Unhandled error:");
    return res.status(500).json({
        message: "Internal server error"
    });
}
