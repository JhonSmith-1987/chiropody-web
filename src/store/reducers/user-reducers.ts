import {UserActiveModel} from "../../models/user-active-model.ts";
import {USER_ACTIVE} from "../types/user-types.ts";

export interface IStateUser {
    userActive: UserActiveModel|null;
}
const initialStateUser: IStateUser = {
    userActive: null,
}
const userReducer = function (state = initialStateUser, action: {type:string; payload:any}):IStateUser {
    switch (action.type) {
        case USER_ACTIVE:
            return {
                userActive: action.payload,
            }
        default:
            return state;
    }
}

export default userReducer;