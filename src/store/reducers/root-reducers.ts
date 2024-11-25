import {combineReducers} from "@reduxjs/toolkit";
import utilReducer from "./util-reducers.ts";
import accountReducer from "./account-reducers.ts";

const RootReducer = combineReducers({
    utilState: utilReducer,
    accountState: accountReducer,
});
export default RootReducer;