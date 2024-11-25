import {ALL_SEARCH_ACCOUNTS} from "../types/account-types.ts";
import {ResponseAllSearchAccountsModel} from "../../models/response-all-search-accounts-model.ts";

export const setAllAccount = (dataAccount: ResponseAllSearchAccountsModel|null) => (dispatch: (arg0: { type: string; payload: ResponseAllSearchAccountsModel|null; }) => void) => {
    dispatch({
        type: ALL_SEARCH_ACCOUNTS,
        payload: dataAccount
    });
}