import {ResponseServerModel} from "./response-server-model.ts";

export interface ResponseServerWithData<T> extends ResponseServerModel {
    data: T
}