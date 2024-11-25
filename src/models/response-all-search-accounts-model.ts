import {ResponseServerModel} from "./response-server-model.ts";
import {AccountDataModel} from "./account-data-model.ts";

export interface ResponseAllSearchAccountsModel extends ResponseServerModel {
    total_count: number;
    data: AccountDataModel[];
}