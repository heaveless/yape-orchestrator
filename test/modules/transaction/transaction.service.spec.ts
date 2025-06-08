import { Test, TestingModule } from '@nestjs/testing';
import { TransactionService } from '@/modules/transaction/transaction.service';
import { TransactionProvider } from '@/modules/transaction/transaction.provider';
import { AntifraudService } from '@/modules/antifraud/antifraud.service';
import { CreateTransactionArgs, GetOneTransactionArgs, GetManyTransactionArgs } from '@/modules/transaction/transaction.model';
import { TransactionStatus, TransactionType } from '@/modules/transaction/transaction.util';

describe('TransactionService', () => {
    let service: TransactionService;
    let provider: TransactionProvider;
    let antifraud: AntifraudService;

    const mockProvider = {
        create: jest.fn(),
        getOne: jest.fn(),
        getMany: jest.fn(),
    };

    const mockAntifraud = {
        sendTransaction: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TransactionService,
                { provide: TransactionProvider, useValue: mockProvider },
                { provide: AntifraudService, useValue: mockAntifraud },
            ],
        }).compile();

        service = module.get<TransactionService>(TransactionService);
        provider = module.get<TransactionProvider>(TransactionProvider);
        antifraud = module.get<AntifraudService>(AntifraudService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a transaction and send to antifraud', async () => {
            mockProvider.create.mockResolvedValue({
                id: 'tx-001',
                typeId: TransactionType.TRANSFER,
                statusId: TransactionStatus.APPROVED,
                amount: 100,
                createdAt: new Date('2025-06-01T00:00:00Z'),
            });

            const args: CreateTransactionArgs = {
                accountExternalIdDebit: 'acc-debit',
                accountExternalIdCredit: 'acc-credit',
                tranferTypeId: TransactionType.TRANSFER,
                value: 100,
            };

            const result = await service.create(args);

            expect(provider.create).toHaveBeenCalledWith({
                sourceAccountId: 'acc-debit',
                destinationAccountId: 'acc-credit',
                typeId: TransactionType.TRANSFER,
                amount: 100,
            });

            expect(antifraud.sendTransaction).toHaveBeenCalledWith({
                id: 'tx-001',
                amount: 100,
            });

            expect(result.transactionType.name).toBe('TRANSFER');
            expect(result.transactionStatus.name).toBe('APPROVED');
        });
    });

    describe('getOne', () => {
        it('should return a mapped transaction by ID', async () => {
            mockProvider.getOne.mockResolvedValue({
                id: 'tx-123',
                sourceAccountId: 'acc-1',
                destinationAccountId: 'acc-2',
                typeId: TransactionType.DEPOSIT,
                statusId: TransactionStatus.PENDING,
                amount: 200,
                createdAt: new Date('2025-06-01'),
                updatedAt: new Date('2025-06-02'),
            });

            const args: GetOneTransactionArgs = { id: 'tx-123' };
            const result = await service.getOne(args);

            expect(result.transactionExternalId).toBe('tx-123');
            expect(result.transactionType.name).toBe('DEPOSIT');
            expect(result.transactionStatus.name).toBe('PENDING');
        });
    });

    describe('getMany', () => {
        it('should return mapped transactions list', async () => {
            mockProvider.getMany.mockResolvedValue({
                items: [
                    {
                        id: 'tx-1',
                        sourceAccountId: 'a1',
                        destinationAccountId: 'a2',
                        typeId: TransactionType.PAYMENT,
                        statusId: TransactionStatus.REJECTED,
                        amount: 50,
                        createdAt: new Date('2025-06-01'),
                        updatedAt: new Date('2025-06-01'),
                    },
                ],
                next: null,
            });

            const args: GetManyTransactionArgs = {} as GetManyTransactionArgs;
            const result = await service.getMany(args);

            expect(result.items).toHaveLength(1);
            expect(result.items[0].transactionType.name).toBe('PAYMENT');
            expect(result.items[0].transactionStatus.name).toBe('REJECTED');
        });
    });
});