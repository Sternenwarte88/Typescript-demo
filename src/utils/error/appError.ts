export class AppError extends Error {
    public status: number;
    public details?: unknown;

    constructor(message: string, status = 500, details?: unknown) {
        super(message);
        this.status = status;
        this.details = details;

        Object.setPrototypeOf(this, new.target.prototype);
    }
}
