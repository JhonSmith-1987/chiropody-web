import {UserDataModel} from "./user-data-model.ts";
import {AccountDataModel} from "./account-data-model.ts";

export interface UserActiveModel {
    user: UserDataModel;
    account: AccountDataModel;
}