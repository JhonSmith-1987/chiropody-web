import {combineReducers} from "@reduxjs/toolkit";
import utilReducer from "./util-reducers.ts";

const RootReducer = combineReducers({
    utilState: utilReducer,
});
export default RootReducer;