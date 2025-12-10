import { AppError } from './appError.js';

export class ValidationError extends AppError {
    constructor(message = 'Data is invalid', details?: unknown) {
        super(message, 400, details);
    }
}
