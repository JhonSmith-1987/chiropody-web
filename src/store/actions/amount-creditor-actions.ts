import {AMOUNT_CREDITOR_USER_ACTIVE} from "../types/amount-creditor-types.ts";

export const setAmountCreditorUserActive = (amount: number) => (dispatch: (arg0: { type: string; payload: number; }) => void) => {
    dispatch({
        type: AMOUNT_CREDITOR_USER_ACTIVE,
        payload: amount
    });
}