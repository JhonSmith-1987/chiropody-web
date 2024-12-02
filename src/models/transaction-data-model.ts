export interface TransactionDataModel {
    id: string;
    date: number;
    amount: number;
    type: string;
    status: string;
    description: string;
    transaction_data: string;
    transaction_id: string;
    user_id: string;
    account_id: string;
}

export type CreateTransactionModel = Omit<TransactionDataModel, 'id'|'date'|'user_id'|'account_id'>;

export interface FormTransactionModel extends Omit<TransactionDataModel, 'id'|'date'|'type'|'status'|'description'|'transaction_data'|'transaction_id'|'user_id'|'account_id'|'amount'> {
    amount_data: string
}

export interface FormPaymentModel extends FormTransactionModel {
    description: string;
}