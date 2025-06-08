import { Injectable } from "@nestjs/common";
import { AntifraudProvider } from "./antifraud.provider";
import { SendTransactionArgs, SendTransactionReturn } from "./antifraud.model";

@Injectable()
export class AntifraudService {
    constructor(
        private readonly antifraudProvider: AntifraudProvider
    ) { }

    sendTransaction(
        transaction: SendTransactionArgs
    ): SendTransactionReturn {
        return this.antifraudProvider.sendTransaction(transaction);
    }
}