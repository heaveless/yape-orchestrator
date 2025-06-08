import { HttpMapper } from '@/shared/decorators/http-mapper.decorator';
import { BaseException } from '@/shared/exceptions/base.exception';

describe('HttpMapper Decorator', () => {
    class TestClass {
        @HttpMapper(
            (res) => ({ ...res, mapped: true }),
            (_meta) => ({ message: 'Custom error', status: 400 })
        )
        async successfulMethod() {
            return { value: 42 };
        }

        @HttpMapper(
            (res) => res,
            (_meta) => ({ message: 'Handled error', status: 403 })
        )
        async failingMethod() {
            const error = new Error('Original error') as any;
            error.meta = { reason: 'Invalid' };
            throw error;
        }

        @HttpMapper((res) => res)
        async failingMethodNoOnRejected() {
            const error = new Error('Unhandled') as any;
            error.meta = { reason: 'Internal' };
            throw error;
        }
    }

    let instance: TestClass;

    beforeEach(() => {
        instance = new TestClass();
    });

    it('should map successful response using onFulfilled', async () => {
        const result = await instance.successfulMethod();
        expect(result).toEqual({ value: 42, mapped: true });
    });

    it('should throw BaseException with mapped message and status', async () => {
        await expect(instance.failingMethod()).rejects.toThrow(BaseException);

        try {
            await instance.failingMethod();
        } catch (err: any) {
            expect(err.message).toBe('Handled error');
            expect(err.status).toBe(403);
            expect(err.meta).toEqual({ reason: 'Invalid' });
        }
    });

    it('should throw BaseException with original message when onRejected is missing', async () => {
        await expect(instance.failingMethodNoOnRejected()).rejects.toThrow(BaseException);

        try {
            await instance.failingMethodNoOnRejected();
        } catch (err: any) {
            expect(err.message).toBe('Unhandled');
            expect(err.status).toBeUndefined();
            expect(err.meta).toEqual({ reason: 'Internal' });
        }
    });
});