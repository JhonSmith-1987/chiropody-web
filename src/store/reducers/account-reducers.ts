import {ALL_SEARCH_ACCOUNTS} from "../types/account-types.ts";
import {ResponsePaginateSearchModel} from "../../models/response-paginate-search-model.ts";
import {AccountDataModel} from "../../models/account-data-model.ts";

export interface IStateAccount {
    allAccounts: ResponsePaginateSearchModel<AccountDataModel[]>|null;
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