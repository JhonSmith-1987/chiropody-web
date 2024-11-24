import {urlApi} from "../url-api.ts";
import axios from 'axios';
import {LoginModel} from "../../models/login-model.ts";
import {ResponseTokenServerModel} from "../../models/response-token-server-model.ts";

export async function loginQuery(data:LoginModel): Promise<ResponseTokenServerModel> {
    const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/public/user/login`,
        headers: {
            // 'authorization': `Bearer ${token}`
        },
        data: data,
    };
    try {
        const response = await axios.request(config);
        const resData = response.data as ResponseTokenServerModel;
        console.log(resData);
        return resData
    } catch (error) {
        console.error('**** error al loguear un usuario');
        console.error(error);
        return {
            status: 500,
            message: 'Internal server error',
            token: null,
            user_roll: null,
        }
    }
}