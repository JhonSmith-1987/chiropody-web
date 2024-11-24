import {SELECTED_NAV} from "../types/util-types.ts";

export const setNavSelected = (path: string) => (dispatch: (arg0: { type: string; payload: string; }) => void) => {
    dispatch({
        type: SELECTED_NAV,
        payload: path
    });
}