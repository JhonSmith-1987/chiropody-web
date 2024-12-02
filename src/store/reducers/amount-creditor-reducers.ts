import {AMOUNT_CREDITOR_USER_ACTIVE} from "../types/amount-creditor-types.ts";


export interface IStateAmountCreditor {
    amountCreditorUserActive: number;
}
const initialStateAmountCreditor: IStateAmountCreditor = {
    amountCreditorUserActive: 0,
}
const amountCreditorReducer = function (state = initialStateAmountCreditor, action: {type:string; payload:any}):IStateAmountCreditor {
    switch (action.type) {
        case AMOUNT_CREDITOR_USER_ACTIVE:
            return {
                amountCreditorUserActive: action.payload,
            }
        default:
            return state;
    }
}

export default amountCreditorReducer;