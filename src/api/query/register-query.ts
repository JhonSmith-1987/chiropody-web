import {urlApi} from "../url-api.ts";
import axios from 'axios';
import {RegisterModel} from "../../models/register-model.ts";
import {ResponseServerModel} from "../../models/response-server-model.ts";

export async function registerQuery(data:RegisterModel): Promise<ResponseServerModel> {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/public/user/register`,
        headers: {
            // 'authorization': `Bearer ${token}`
        },
        data: data,
    };
    try {
        const response = await axios.request(config);
        const resData = response.data as ResponseServerModel;
        console.log(resData);
        return resData
    } catch (error) {
        console.error('**** error al registrar un usuario');
        console.error(error);
        return {
            status: 500,
            message: 'Internal server error'
        }
    }
}