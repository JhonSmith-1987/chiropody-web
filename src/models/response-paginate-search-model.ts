import {ResponseServerModel} from "./response-server-model.ts";

export interface ResponsePaginateSearchModel<T> extends ResponseServerModel {
    total_count: number;
    data: T;
}