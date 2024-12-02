import {UserDataModel} from "./user-data-model.ts";

export interface ClientDataModel extends Omit<UserDataModel, 'email'|'password'|'roll'> {
    address: string;
    identification: string;
    start_date: number;
    user_id: string;
}