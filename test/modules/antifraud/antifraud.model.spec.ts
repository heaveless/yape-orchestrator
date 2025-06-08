import {
    SendTransactionArgs,
    SendTransactionExternalPayload,
    SendTransactionExternalResult
} from '@/modules/antifraud/antifraud.model';

describe('SendTransaction types', () => {
    it('should create SendTransactionArgs with valid shape', () => {
        const args: SendTransactionArgs = {
            id: 'tx-123',
            amount: 150,
        };

        expect(args.id).toBe('tx-123');
        expect(args.amount).toBe(150);
    });

    it('should assign external payload and result types correctly', () => {
        const payload: SendTransactionExternalPayload = {
            id: 'tx-999',
            amount: 300,
        };

        const result: SendTransactionExternalResult = undefined;

        expect(payload).toEqual({ id: 'tx-999', amount: 300 });
        expect(result).toBeUndefined();
    });
});