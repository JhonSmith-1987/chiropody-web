export interface TransactionCreditorModel {
    id: string;
    date: number;
    amount: number;
    type: string;
    status: string;
    description: string;
    user_id: string;
    account_id: string;
    creditor_id: string;
}

export interface TransactionCreditorDataModel extends Omit<TransactionCreditorModel, 'date'> {
    date: string;
}

export type CreateTransactionCreditorModel = Pick<TransactionCreditorModel, 'creditor_id'|'status'|'type'|'amount'|'description'>;

export interface FormTransactionCreditorModel {
    amount_data: string;
    description: string
}

export interface FormPaymentCreditorModel extends FormTransactionCreditorModel {
    description: string;
}