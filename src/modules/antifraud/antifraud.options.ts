import { ClientProvider, ClientsModuleOptionsFactory, Transport } from "@nestjs/microservices";
import { ConfigService } from "@nestjs/config";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AntifraudKafkaOptions implements ClientsModuleOptionsFactory {
    constructor(
        private readonly configService: ConfigService
    ) { }

    createClientOptions(): Promise<ClientProvider> | ClientProvider {
        return {
            transport: Transport.KAFKA,
            options: {
                client: {
                    clientId: 'or-antifraud',
                    brokers: this.configService.getOrThrow<Array<string>>('antifraud.KAFKA_BROKERS')
                },
                producerOnlyMode: true
            },
        }
    }
}