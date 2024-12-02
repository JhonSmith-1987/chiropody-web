import {urlApi} from "../api/url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../models/response-server-with-data.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {useAppDispatch} from "./store-hook.ts";
import {setAmountTotalUserActive} from "../store/actions/amount-actions.ts";
import {useEffect, useState} from "react";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";

export default function useAmountTotalHook() {

    const token = getLocalStorageData('tkn_chiropody');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loadAmountUseActive, setLoadAmountUseActive] = useState<boolean>(false);

    useEffect(() => {
        amountTotalUserActiveQueryPrivate(token).then(() => {});
    }, [token]);

    async function amountTotalUserActiveQueryPrivate(token: string|null) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/amount_total/user_active`,
            headers: {
                'authorization': `Bearer ${token}`
            },
        };
        try {
            setLoadAmountUseActive(true);
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<number>;
            if (resData.status === 401) {
                // Permiso denegado
                alertInfoToast(resData.message);
                dispatch(setAmountTotalUserActive(resData.data));
                navigate('/admin/session_ended');
                setLoadAmountUseActive(false);
                return;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                dispatch(setAmountTotalUserActive(resData.data));
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                setLoadAmountUseActive(false);
                return;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                dispatch(setAmountTotalUserActive(resData.data));
                alertInfoToast(resData.message);
                setLoadAmountUseActive(false);
                return;
            }
            dispatch(setAmountTotalUserActive(resData.data));
            setLoadAmountUseActive(false);
        } catch (error) {
            console.error('**** error al obtener todas las cuentas');
            console.error(error);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            setLoadAmountUseActive(false);
            return;
        }
    }

    return {
        loadAmountUseActive,
        amountTotalUserActiveQueryPrivate,
    };
}