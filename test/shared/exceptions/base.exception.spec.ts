import { BaseException } from '@/shared/exceptions/base.exception';

describe('BaseException', () => {
    it('should create an instance with message and status', () => {
        const error = new BaseException('Unauthorized', 401);

        expect(error).toBeInstanceOf(BaseException);
        expect(error).toBeInstanceOf(Error);
        expect(error.message).toBe('Unauthorized');
        expect(error.status).toBe(401);
        expect(error.meta).toEqual({});
    });

    it('should accept meta data', () => {
        const meta = { userId: '123', context: { ip: '127.0.0.1' } };
        const error = new BaseException('Forbidden', 403, meta);

        expect(error.meta).toEqual(meta);
    });

    it('should preserve error stack', () => {
        const error = new BaseException('Something went wrong', 500);
        expect(error.stack).toBeDefined();
        expect(typeof error.stack).toBe('string');
    });
});