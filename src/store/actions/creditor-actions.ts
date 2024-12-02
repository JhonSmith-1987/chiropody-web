import {ResponsePaginateSearchModel} from "../../models/response-paginate-search-model.ts";
import {CreditorDataModel} from "../../models/creditor-data-model.ts";
import {PAGINATE_SEARCH_CREDITORS, SINGLE_CREDITOR} from "../types/creditor-types.ts";

export const setPaginateSearchCreditors = (creditors: ResponsePaginateSearchModel<CreditorDataModel[]>|null) => (dispatch: (arg0: { type: string; payload: ResponsePaginateSearchModel<CreditorDataModel[]>|null; }) => void) => {
    dispatch({
        type: PAGINATE_SEARCH_CREDITORS,
        payload: creditors
    });
}

export const setSingleCreditor = (creditor: CreditorDataModel|null) => (dispatch: (arg0: { type: string; payload: CreditorDataModel|null; }) => void) => {
    dispatch({
        type: SINGLE_CREDITOR,
        payload: creditor
    });
}