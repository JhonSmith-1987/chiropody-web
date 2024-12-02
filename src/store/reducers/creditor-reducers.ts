import {ResponsePaginateSearchModel} from "../../models/response-paginate-search-model.ts";
import {CreditorDataModel} from "../../models/creditor-data-model.ts";
import {PAGINATE_SEARCH_CREDITORS, SINGLE_CREDITOR} from "../types/creditor-types.ts";


export interface IStateCreditor {
    creditorsData: ResponsePaginateSearchModel<CreditorDataModel[]>|null;
    singleCreditor: CreditorDataModel|null;
}
const initialStateCreditor: IStateCreditor = {
    creditorsData: null,
    singleCreditor: null,
}
const creditorReducer = function (state = initialStateCreditor, action: {type:string; payload:any}):IStateCreditor {
    switch (action.type) {
        case PAGINATE_SEARCH_CREDITORS:
            return {
                creditorsData: action.payload,
                singleCreditor: state.singleCreditor,
            }
        case SINGLE_CREDITOR:
            return {
                creditorsData: state.creditorsData,
                singleCreditor: action.payload,
            }
        default:
            return state;
    }
}

export default creditorReducer;