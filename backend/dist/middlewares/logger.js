import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
export const logger = pino({
    level: "info",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
        },
    },
    redact: ["req.headers.authorization"], // Authorization kimi həssas field-ləri gizlət
});
export const httpLogger = pinoHttp({
    logger,
    genReqId: (req) => req.headers["x-request-id"] || randomUUID(),
    customSuccessMessage: (req, res) => `${req.method} ${req.url} -> ${res.statusCode}`,
    customErrorMessage: (req, res, err) => `${req.method} ${req.url} -> ${res.statusCode} (${err?.message})`,
    serializers: {
        req(req) {
            return {
                id: req.id,
                method: req.method,
                url: req.url,
                params: req.params,
                query: req.query,
            };
        },
        res(res) {
            return { statusCode: res.statusCode };
        },
    },
});
