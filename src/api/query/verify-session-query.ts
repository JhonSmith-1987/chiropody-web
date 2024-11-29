import {urlApi} from "../url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../../models/response-server-with-data.ts";
import {UserActiveModel} from "../../models/user-active-model.ts";

export async function verifySessionQuery(token: string): Promise<ResponseServerWithData<UserActiveModel|null>> {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${urlApi}/api/private/auth/validate_session`,
        headers: {
            'authorization': `Bearer ${token}`
        },
    };
    try {
        const response = await axios.request(config);
        const resData = response.data as ResponseServerWithData<UserActiveModel|null>;
        console.log(resData);
        return resData
    } catch (error) {
        console.error('**** error al validar la sesion');
        console.error(error);
        return {
            status: 500,
            message: 'Internal server error',
            data: null
        }
    }
}