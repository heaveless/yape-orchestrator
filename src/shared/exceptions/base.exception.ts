export class BaseException extends Error {
    constructor(
        readonly message: string,
        readonly status: number,
        readonly meta: Record<string, string | object> = {}) {
        super(message);
    }
}
