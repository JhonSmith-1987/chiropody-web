import {ClientDataModel} from "./client-data-model.ts";

export type CreditorDataModel = ClientDataModel;

export type FormCreateCreditor = Omit<CreditorDataModel, 'id'|'account_id'|'start_date'|'startDate'|'user_id'>;

export interface UpdateCreditorModel {
    address?: string;
    identification?: string;
    name?: string;
    phone?: string;
}