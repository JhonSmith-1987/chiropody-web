import {urlApi} from "../url-api.ts";
import axios from 'axios';
import {AllSearchAccountsModel} from "../../models/all-search-accounts-model.ts";
import {ResponseAllSearchAccountsModel} from "../../models/response-all-search-accounts-model.ts";

export async function getAllAccountsQueryPrivate(data: AllSearchAccountsModel, token: string): Promise<ResponseAllSearchAccountsModel> {
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
        const resData = response.data as ResponseAllSearchAccountsModel;
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