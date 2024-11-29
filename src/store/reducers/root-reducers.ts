import {combineReducers} from "@reduxjs/toolkit";
import utilReducer from "./util-reducers.ts";
import accountReducer from "./account-reducers.ts";
import userReducer from "./user-reducers.ts";

const RootReducer = combineReducers({
    utilState: utilReducer,
    accountState: accountReducer,
    userState: userReducer,
});
export default RootReducer;