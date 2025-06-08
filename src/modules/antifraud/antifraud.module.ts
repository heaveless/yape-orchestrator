import { Module } from "@nestjs/common";
import { AntifraudService } from "./antifraud.service";
import { AntifraudProvider } from "./antifraud.provider";
import { ClientsModule } from "@nestjs/microservices";
import { INJECT_ANTIFRAUD_KAFKA } from "./antifraud.constant";
import { AntifraudKafkaOptions } from "./antifraud.options";

@Module({
    imports: [
        ClientsModule.registerAsync({
            clients: [{
                name: INJECT_ANTIFRAUD_KAFKA,
                useClass: AntifraudKafkaOptions,
            }]
        }),
    ],
    providers: [
        AntifraudService,
        AntifraudProvider
    ],
    exports: [
        AntifraudService
    ]
})
export class AntifraudModule { }
