import {SELECTED_NAV} from "../types/util-types.ts";

export interface IStateUtil {
    navSelected: string;
}
const initialStateUtil: IStateUtil = {
    navSelected: '/',
}
const utilReducer = function (state = initialStateUtil, action: {type:string; payload:any}):IStateUtil {
    switch (action.type) {
        case SELECTED_NAV:
            return {
                navSelected: action.payload,
            }
        default:
            return state;
    }
}

export default utilReducer;