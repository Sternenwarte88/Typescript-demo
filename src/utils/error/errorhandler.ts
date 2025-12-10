import { ErrorRequestHandler } from 'express';
import { AppError } from './appError.js'; // oder wie dein Pfad ist

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.status).json({
            error: err.message,
            status: err.status,
            details: err.details ?? null,
        });
    }

    return res.status(500).json({
        error: 'Internal Server Error',
    });
};
