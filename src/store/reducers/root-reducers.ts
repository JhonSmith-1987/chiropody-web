import {combineReducers} from "@reduxjs/toolkit";
import utilReducer from "./util-reducers.ts";
import accountReducer from "./account-reducers.ts";
import userReducer from "./user-reducers.ts";
import amountReducer from "./amount-reducers.ts";
import creditorReducer from "./creditor-reducers.ts";
import amountCreditorReducer from "./amount-creditor-reducers.ts";

const RootReducer = combineReducers({
    utilState: utilReducer,
    accountState: accountReducer,
    userState: userReducer,
    amountState: amountReducer,
    creditorState: creditorReducer,
    amountCreditorState: amountCreditorReducer,
});
export default RootReducer;