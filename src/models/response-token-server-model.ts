import {ResponseServerModel} from "./response-server-model.ts";

export interface ResponseTokenServerModel extends ResponseServerModel {
    token: string|null,
    user_roll: string|null,
}