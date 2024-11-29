import {UserActiveModel} from "../../models/user-active-model.ts";
import {USER_ACTIVE} from "../types/user-types.ts";

export const setUserActive = (user: UserActiveModel|null) => async (dispatch: (arg0: { type: string; payload: UserActiveModel|null; }) => void) => {
    dispatch({
        type: USER_ACTIVE,
        payload: user
    });
}