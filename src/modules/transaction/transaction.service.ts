import { Injectable, Logger } from "@nestjs/common";
import { TransactionProvider } from "./transaction.provider";
import { AntifraudService } from "../antifraud/antifraud.service";
import { CreateTransactionArgs, CreateTransactionReturn, GetManyTransactionArgs, GetManyTransactionReturn, GetOneTransactionArgs, GetOneTransactionReturn } from "./transaction.model";
import { getStatusName, getTypeName } from "./transaction.util";

@Injectable()
export class TransactionService {
    private readonly logger = new Logger(TransactionService.name);

    constructor(
        private readonly transactionProvider: TransactionProvider,
        private readonly antifraudService: AntifraudService
    ) { }

    async create(
        args: CreateTransactionArgs
    ): Promise<CreateTransactionReturn> {
        this.logger.log('creating transaction...');

        const response = await this.transactionProvider.create({
            sourceAccountId: args.accountExternalIdDebit,
            destinationAccountId: args.accountExternalIdCredit,
            typeId: args.tranferTypeId,
            amount: args.value
        });

        this.logger.log('preparing transaction for evaluation...')

        this.antifraudService.sendTransaction({
            id: response.id,
            amount: response.amount
        });

        return {
            transactionExternalId: response.id,
            transactionType: {
                name: getTypeName(response.typeId)
            },
            transactionStatus: {
                name: getStatusName(response.statusId)
            },
            value: response.amount,
            createdAt: response.createdAt
        };
    }

    async getOne(
        args: GetOneTransactionArgs
    ): Promise<GetOneTransactionReturn> {
        const response = await this.transactionProvider.getOne(args);
        return {
            transactionExternalId: response.id,
            accountExternalIdDebit: response.sourceAccountId,
            accountExternalIdCredit: response.destinationAccountId,
            transactionType: {
                name: getTypeName(response.typeId)
            },
            transactionStatus: {
                name: getStatusName(response.statusId)
            },
            value: response.amount,
            createdAt: response.createdAt,
            updatedAt: response.updatedAt
        }
    }

    async getMany(
        args: GetManyTransactionArgs
    ): Promise<GetManyTransactionReturn> {
        const response = await this.transactionProvider.getMany(args);
        return {
            items: response.items.map(x => ({
                transactionExternalId: x.id,
                accountExternalIdDebit: x.sourceAccountId,
                accountExternalIdCredit: x.destinationAccountId,
                transactionType: {
                    name: getTypeName(x.typeId)
                },
                transactionStatus: {
                    name: getStatusName(x.statusId)
                },
                value: x.amount,
                createdAt: x.createdAt,
                updatedAt: x.updatedAt
            })),
            next: response.next
        }
    }
}