import { IsNumber, IsString, IsUUID } from "class-validator";

// CREATE

export class CreateTransactionRequest {
    @IsString()
    @IsUUID()
    accountExternalIdDebit: string;

    @IsString()
    @IsUUID()
    accountExternalIdCredit: string;

    @IsNumber()
    tranferTypeId: number;

    @IsNumber()
    value: number;
}

export type CreateTransactionResponse = {
    transactionExternalId: string;
    transactionType: {
        name: string;
    };
    transactionStatus: {
        name: string;
    };
    value: number;
    createdAt: string;
};

// GET ONE

export type GetOneTransactionResponse = {
    transactionExternalId: string,
    accountExternalIdDebit: string,
    accountExternalIdCredit: string
    transactionType: {
        name: string;
    };
    transactionStatus: {
        name: string;
    };
    value: number,
    createdAt: string,
    updatedAt?: string;
};

// GET MANY

export type GetManyTransactionResponse = {
    items: Array<GetOneTransactionResponse>,
    next: number;
};

// === INTERNAL ===

export type CreateTransactionArgs = CreateTransactionRequest;
export type CreateTransactionReturn = CreateTransactionResponse;

export type GetOneTransactionArgs = {
    id: string;
};

export type GetOneTransactionReturn = GetOneTransactionResponse;

export type GetManyTransactionArgs = {
    account: string;
    cursor?: string;
};
export type GetManyTransactionReturn = GetManyTransactionResponse;

// === EXTERNAL ===

export type CreateTransactionExternalRequest = {
    sourceAccountId: string;
    destinationAccountId: string;
    typeId: number;
    amount: number;
};

export type CreateTransactionExternalResponse = {
    id: string;
    typeId: number;
    statusId: number;
    amount: number;
    createdAt: string;
};

export type GetOneTransactionExternalRequest = {
    id: string;
};

export type GetOneTransactionExternalResponse = {
    statusId: number,
    typeId: number,
    destinationAccountId: string,
    updatedAt?: string;
    createdAt: string,
    amount: number,
    id: string,
    sourceAccountId: string
};

export type GetManyTransactionExternalRequest = {
    cursor?: string;
    account: string;
};

export type GetManyTransactionExternalResponse = {
    items: Array<GetOneTransactionExternalResponse>,
    next: number;
};