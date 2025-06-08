import {
    CreateTransactionArgs,
    CreateTransactionReturn,
    GetOneTransactionReturn,
    GetManyTransactionReturn,
    CreateTransactionExternalRequest,
    CreateTransactionExternalResponse,
    GetOneTransactionExternalResponse,
} from '@/modules/transaction/transaction.model';
import { validate } from 'class-validator';
import { CreateTransactionRequest } from '@/modules/transaction/transaction.model';

describe('Transaction DTOs and Types', () => {
    it('should assign CreateTransactionArgs shape', () => {
        const args: CreateTransactionArgs = {
            accountExternalIdDebit: 'uuid-1',
            accountExternalIdCredit: 'uuid-2',
            tranferTypeId: 1,
            value: 200,
        };
        expect(args.tranferTypeId).toBe(1);
    });

    it('should assign CreateTransactionReturn structure', () => {
        const response: CreateTransactionReturn = {
            transactionExternalId: 'tx-001',
            transactionType: { name: 'TRANSFER' },
            transactionStatus: { name: 'PENDING' },
            value: 100,
            createdAt: '2025-06-01T00:00:00Z',
        };
        expect(response.transactionStatus.name).toBe('PENDING');
    });

    it('should assign GetOneTransactionReturn shape', () => {
        const result: GetOneTransactionReturn = {
            transactionExternalId: 'tx-001',
            accountExternalIdDebit: 'acc-1',
            accountExternalIdCredit: 'acc-2',
            transactionType: { name: 'PAYMENT' },
            transactionStatus: { name: 'APPROVED' },
            value: 300,
            createdAt: '2025-06-01',
            updatedAt: '2025-06-02',
        };
        expect(result.updatedAt).toBeDefined();
    });

    it('should assign GetManyTransactionReturn shape', () => {
        const result: GetManyTransactionReturn = {
            items: [
                {
                    transactionExternalId: 'tx-1',
                    accountExternalIdDebit: 'a1',
                    accountExternalIdCredit: 'a2',
                    transactionType: { name: 'REFUND' },
                    transactionStatus: { name: 'REJECTED' },
                    value: 50,
                    createdAt: '2025-06-01',
                },
            ],
            next: 1,
        };
        expect(result.items.length).toBe(1);
    });

    it('should assign CreateTransactionExternalRequest shape', () => {
        const request: CreateTransactionExternalRequest = {
            sourceAccountId: 'acc-1',
            destinationAccountId: 'acc-2',
            typeId: 2,
            amount: 100,
        };
        expect(request.typeId).toBe(2);
    });

    it('should assign CreateTransactionExternalResponse shape', () => {
        const response: CreateTransactionExternalResponse = {
            id: 'tx-id',
            typeId: 1,
            statusId: 0,
            amount: 100,
            createdAt: '2025-06-01',
        };
        expect(response.statusId).toBe(0);
    });

    it('should assign GetOneTransactionExternalResponse shape', () => {
        const result: GetOneTransactionExternalResponse = {
            id: 'tx-id',
            sourceAccountId: 's1',
            destinationAccountId: 'd1',
            amount: 100,
            typeId: 1,
            statusId: 2,
            createdAt: '2025-06-01',
            updatedAt: '2025-06-02',
        };
        expect(result.typeId).toBe(1);
    });

    it('should validate CreateTransactionRequest class', async () => {
        const dto = new CreateTransactionRequest();
        dto.accountExternalIdDebit = 'not-a-uuid';
        dto.accountExternalIdCredit = '123';
        dto.tranferTypeId = 1;
        dto.value = 100 as any;

        const errors = await validate(dto);
        expect(errors.length).toBeGreaterThan(0);
    });
});