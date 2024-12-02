import {TransactionDataModel} from "../../models/transaction-data-model.ts";
import {REGISTER_TRANSACTION} from "../types/transaction-types.ts";

export const setRegisterTransaction = (transaction: TransactionDataModel|null) => (dispatch: (arg0: { type: string; payload: TransactionDataModel|null; }) => void) => {
    dispatch({
        type: REGISTER_TRANSACTION,
        payload: transaction
    });
}