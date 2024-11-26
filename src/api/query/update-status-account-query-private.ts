import {urlApi} from "../url-api.ts";
import axios from 'axios';
import {UpdateStatusAccountModel} from "../../models/update-status-account-model.ts";
import {AccountDataModel} from "../../models/account-data-model.ts";
import {ResponseServerWithData} from "../../models/response-server-with-data.ts";

export async function updateStatusAccountQueryPrivate(data: UpdateStatusAccountModel, token: string): Promise<ResponseServerWithData<AccountDataModel|null>> {
    const config = {
        method: 'put',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/private/account/update_status`,
        headers: {
            'authorization': `Bearer ${token}`
        },
        data: data,
    };
    try {
        const response = await axios.request(config);
        const resData = response.data as ResponseServerWithData<AccountDataModel|null>;
        console.log(resData);
        return resData
    } catch (error) {
        console.error('**** error al obtener todas las cuentas');
        console.error(error);
        return {
            status: 500,
            message: 'Internal server error',
            data: null
        }
    }
}