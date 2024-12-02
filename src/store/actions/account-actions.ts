import {ALL_SEARCH_ACCOUNTS} from "../types/account-types.ts";
import {ResponsePaginateSearchModel} from "../../models/response-paginate-search-model.ts";
import {AccountDataModel} from "../../models/account-data-model.ts";

export const setAllAccount = (dataAccount: ResponsePaginateSearchModel<AccountDataModel[]>|null) => (dispatch: (arg0: { type: string; payload: ResponsePaginateSearchModel<AccountDataModel[]>|null; }) => void) => {
    dispatch({
        type: ALL_SEARCH_ACCOUNTS,
        payload: dataAccount
    });
}