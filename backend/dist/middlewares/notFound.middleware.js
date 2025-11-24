export function notFound(req, res) {
    return res.status(404).json({
        message: "Route not found",
        method: req.method,
        path: req.originalUrl,
    });
}
