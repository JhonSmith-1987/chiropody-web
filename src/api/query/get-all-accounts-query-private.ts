import {urlApi} from "../url-api.ts";
import axios from 'axios';
import {PaginateSearchModel} from "../../models/paginate-search-model.ts";
import {ResponsePaginateSearchModel} from "../../models/response-paginate-search-model.ts";
import {AccountDataModel} from "../../models/account-data-model.ts";

export async function getAllAccountsQueryPrivate(data: PaginateSearchModel, token: string): Promise<ResponsePaginateSearchModel<AccountDataModel[]>> {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/private/account/all_search_accounts`,
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: data,
    };
    try {
        const response = await axios.request(config);
        const resData = response.data as ResponsePaginateSearchModel<AccountDataModel[]>;
        console.log(resData);
        return resData
    } catch (error) {
        console.error('**** error al obtener todas las cuentas');
        console.error(error);
        return {
            status: 500,
            message: 'Internal server error',
            total_count: 0,
            data: []
        }
    }
}