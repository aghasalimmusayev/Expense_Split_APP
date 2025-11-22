import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "crypto";
import type { Request } from "express";

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
    genReqId: (req: Request) => (req.headers["x-request-id"] as string) || randomUUID(),
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
