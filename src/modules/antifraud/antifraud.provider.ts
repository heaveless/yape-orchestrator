import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { INJECT_ANTIFRAUD_KAFKA } from "./antifraud.constant";
import { SendTransactionExternalPayload, SendTransactionExternalResult } from "./antifraud.model";

@Injectable()
export class AntifraudProvider implements OnModuleInit {
    constructor(@Inject(INJECT_ANTIFRAUD_KAFKA) private readonly kafka: ClientKafka) { }

    async onModuleInit() {
        await this.kafka.connect();
    }

    sendTransaction(
        payload: SendTransactionExternalPayload
    ): SendTransactionExternalResult {
        this.kafka.emit('transaction-transaction-topic', payload);
    }
}