import { AppError } from './appError.js';

export class NotFoundError extends AppError {
    constructor(message = 'not found', details?: unknown) {
        super(message, 404, details);
    }
}
