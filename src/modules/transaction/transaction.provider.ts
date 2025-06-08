import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { CreateTransactionExternalRequest, CreateTransactionExternalResponse, GetManyTransactionExternalRequest, GetManyTransactionExternalResponse, GetOneTransactionExternalRequest, GetOneTransactionExternalResponse } from "./transaction.model";
import { firstValueFrom } from "rxjs";
import { HttpMapper } from "@/shared/decorators/http-mapper.decorator";
import { queryString, template } from "@/shared/utils/string.util";

@Injectable()
export class TransactionProvider {
    constructor(
        private readonly httpService: HttpService
    ) { }

    @HttpMapper(res => res.data)
    async create(
        request: CreateTransactionExternalRequest
    ): Promise<CreateTransactionExternalResponse> {
        const response = await firstValueFrom(this.httpService.post("/api/transactions", request));
        return response.data;
    }

    @HttpMapper(res => res.data)
    async getOne(
        request: GetOneTransactionExternalRequest
    ): Promise<GetOneTransactionExternalResponse> {
        const endpoint = template("/api/transactions/{id}", { id: request.id })
        const response = await firstValueFrom(this.httpService.get(endpoint));
        return response.data;
    }

    @HttpMapper(res => res.data)
    async getMany(
        request: GetManyTransactionExternalRequest
    ): Promise<GetManyTransactionExternalResponse> {
        const query = queryString(request)
        const endpoint = template("/api/transactions?{query}", { query })
        const response = await firstValueFrom(this.httpService.get(endpoint));
        return response.data;
    }
}
