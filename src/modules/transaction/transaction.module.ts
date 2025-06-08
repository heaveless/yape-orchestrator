import { Module } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { TransactionProvider } from "./transaction.provider";
import { TransactionController } from "./transaction.controller";
import { AntifraudModule } from "../antifraud/antifraud.module";
import { HttpModule } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";

@Module({
    imports: [
        HttpModule.registerAsync({
            useFactory: (configService: ConfigService) => ({
                baseURL: configService.get<string>('transaction.BASE_URL')
            }),
            inject: [ConfigService]
        }),
        AntifraudModule
    ],
    controllers: [
        TransactionController
    ],
    providers: [
        TransactionService,
        TransactionProvider
    ],
    exports: [
        TransactionService
    ]
})
export class TransactionModule { }
