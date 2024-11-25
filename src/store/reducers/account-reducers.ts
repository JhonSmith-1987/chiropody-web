import {ALL_SEARCH_ACCOUNTS} from "../types/account-types.ts";
import {ResponseAllSearchAccountsModel} from "../../models/response-all-search-accounts-model.ts";

export interface IStateAccount {
    allAccounts: ResponseAllSearchAccountsModel|null;
}
const initialStateAccount: IStateAccount = {
    allAccounts: null,
}
const accountReducer = function (state = initialStateAccount, action: {type:string; payload:any}):IStateAccount {
    switch (action.type) {
        case ALL_SEARCH_ACCOUNTS:
            return {
                allAccounts: action.payload,
            }
        default:
            return state;
    }
}

export default accountReducer;