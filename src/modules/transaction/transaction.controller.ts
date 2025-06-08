import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { TransactionService } from "./transaction.service";
import { CreateTransactionRequest, CreateTransactionResponse, GetManyTransactionResponse, GetOneTransactionResponse } from "./transaction.model";

@Controller("transactions")
export class TransactionController {
    constructor(
        private readonly transactionService: TransactionService
    ) { }

    @Post()
    async create(
        @Body()
        body: CreateTransactionRequest
    ): Promise<CreateTransactionResponse> {
        return this.transactionService.create(body);
    }

    @Get(":id")
    getOne(
        @Param("id")
        id: string
    ): Promise<GetOneTransactionResponse> {
        return this.transactionService.getOne({ id })
    }

    @Get()
    getMany(
        @Query("account")
        account: string,
        @Query("cursor")
        cursor?: string
    ): Promise<GetManyTransactionResponse> {
        return this.transactionService.getMany({ account, cursor });
    }
}