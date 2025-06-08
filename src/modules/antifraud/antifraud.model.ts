export type SendTransactionArgs = {
    id: string;
    amount: number;
};

export type SendTransactionReturn = void;

// === EXTERNAL ===

export type SendTransactionExternalPayload = SendTransactionArgs;
export type SendTransactionExternalResult = SendTransactionReturn;