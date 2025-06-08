import { Test, TestingModule } from '@nestjs/testing';
import { AntifraudProvider } from '@/modules/antifraud/antifraud.provider';
import { ClientKafka } from '@nestjs/microservices';
import { INJECT_ANTIFRAUD_KAFKA } from '@/modules/antifraud/antifraud.constant';
import { SendTransactionExternalPayload } from '@/modules/antifraud/antifraud.model';

describe('AntifraudProvider', () => {
    let provider: AntifraudProvider;
    let kafkaClient: ClientKafka;

    const mockKafka = {
        connect: jest.fn(),
        emit: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AntifraudProvider,
                {
                    provide: INJECT_ANTIFRAUD_KAFKA,
                    useValue: mockKafka,
                },
            ],
        }).compile();

        provider = module.get<AntifraudProvider>(AntifraudProvider);
        kafkaClient = module.get<ClientKafka>(INJECT_ANTIFRAUD_KAFKA);
    });

    it('should be defined', () => {
        expect(provider).toBeDefined();
    });

    describe('onModuleInit', () => {
        it('should call kafka.connect()', async () => {
            await provider.onModuleInit();
            expect(kafkaClient.connect).toHaveBeenCalled();
        });
    });

    describe('sendTransaction', () => {
        it('should emit transaction payload to kafka topic', () => {
            const payload: SendTransactionExternalPayload = {
                id: 'tx-abc',
                amount: 500,
            };

            provider.sendTransaction(payload);

            expect(kafkaClient.emit).toHaveBeenCalledWith(
                'transaction-transaction-topic',
                payload
            );
        });
    });
});