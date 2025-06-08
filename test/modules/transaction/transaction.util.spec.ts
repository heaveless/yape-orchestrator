import { getStatusName, getTypeName } from '@/modules/transaction/transaction.util';

describe('Transaction enums utils', () => {
    describe('getStatusName', () => {
        it('should return correct name for each status ID', () => {
            expect(getStatusName(0)).toBe('PENDING');
            expect(getStatusName(1)).toBe('APPROVED');
            expect(getStatusName(2)).toBe('REJECTED');
        });

        it('should return undefined for unknown status ID', () => {
            expect(getStatusName(99)).toBeUndefined();
        });
    });

    describe('getTypeName', () => {
        it('should return correct name for each type ID', () => {
            expect(getTypeName(1)).toBe('TRANSFER');
            expect(getTypeName(2)).toBe('DEPOSIT');
            expect(getTypeName(3)).toBe('WITHDRAWAL');
            expect(getTypeName(4)).toBe('PAYMENT');
            expect(getTypeName(5)).toBe('COLLECTION');
            expect(getTypeName(6)).toBe('PURCHASE');
            expect(getTypeName(7)).toBe('REFUND');
        });

        it('should return undefined for unknown type ID', () => {
            expect(getTypeName(999)).toBeUndefined();
        });
    });
});