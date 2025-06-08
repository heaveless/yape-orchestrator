import { BaseException } from "../exceptions/base.exception";

type Data = Record<string, any>;
type ThrowArgs = Record<string, any>;
type ThrowReturn = {
    message: string;
    status?: number;
};

export const HttpMapper = (
    onFulfilled: (args: Data) => Data,
    onRejected?: (args: ThrowArgs) => ThrowReturn
) => (
    _target: Object,
    _property: string | symbol,
    descriptor: PropertyDescriptor
) => {
        const defaultDescriptor = descriptor.value;

        descriptor.value = async function (...args: any[]) {
            try {
                const response = await defaultDescriptor.apply(this, args);
                return onFulfilled(response);
            } catch (err: any) {
                const response = err;

                if (onRejected) {
                    const throwResponse = onRejected(err.meta);
                    response.message = throwResponse.message;

                    if (throwResponse.status) {
                        response.status = throwResponse.status;
                    }
                }

                throw new BaseException(response.message, response.status, response.meta);
            }
        };

        return descriptor;
    }
