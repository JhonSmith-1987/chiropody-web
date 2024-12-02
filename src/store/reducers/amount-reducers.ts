import {AMOUNT_TOTAL_USER_ACTIVE} from "../types/amount-types.ts";


export interface IStateAmount {
    amountTotalUserActive: number;
}
const initialStateAmount: IStateAmount = {
    amountTotalUserActive: 0,
}
const amountReducer = function (state = initialStateAmount, action: {type:string; payload:any}):IStateAmount {
    switch (action.type) {
        case AMOUNT_TOTAL_USER_ACTIVE:
            return {
                amountTotalUserActive: action.payload,
            }
        default:
            return state;
    }
}

export default amountReducer;