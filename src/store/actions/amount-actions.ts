import {AMOUNT_TOTAL_USER_ACTIVE} from "../types/amount-types.ts";

export const setAmountTotalUserActive = (amount: number) => (dispatch: (arg0: { type: string; payload: number; }) => void) => {
    dispatch({
        type: AMOUNT_TOTAL_USER_ACTIVE,
        payload: amount
    });
}