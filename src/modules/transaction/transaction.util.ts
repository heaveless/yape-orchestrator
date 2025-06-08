export enum TransactionStatus {
    PENDING,
    APPROVED,
    REJECTED
}

export enum TransactionType {
    TRANSFER = 1,
    DEPOSIT,
    WITHDRAWAL,
    PAYMENT,
    COLLECTION,
    PURCHASE,
    REFUND
}

export const getStatusName = (id: number): string => TransactionStatus[id];
export const getTypeName = (id: number): string => TransactionType[id];
