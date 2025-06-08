import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudService } from '@/modules/antifraud/antifraud.service';
import { AntifraudProvider } from '@/modules/antifraud/antifraud.provider';
import { SendTransactionArgs } from '@/modules/antifraud/antifraud.model';

describe('AntifraudService', () => {
    let service: AntifraudService;
    let provider: AntifraudProvider;

    const mockAntifraudProvider = {
        sendTransaction: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AntifraudService,
                {
                    provide: AntifraudProvider,
                    useValue: mockAntifraudProvider,
                },
            ],
        }).compile();

        service = module.get<AntifraudService>(AntifraudService);
        provider = module.get<AntifraudProvider>(AntifraudProvider);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('sendTransaction', () => {
        it('should delegate to AntifraudProvider.sendTransaction', () => {
            const args: SendTransactionArgs = { id: 'tx-001', amount: 100 };

            service.sendTransaction(args);

            expect(provider.sendTransaction).toHaveBeenCalledWith(args);
        });
    });
});