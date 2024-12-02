import {urlApi} from "../api/url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../models/response-server-with-data.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {useAppDispatch} from "./store-hook.ts";
import {useState} from "react";
import {setAmountCreditorUserActive} from "../store/actions/amount-creditor-actions.ts";

export default function useAmountCreditorHook() {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [loadAmountCreditorUseActive, setLoadAmountCreditorUseActive] = useState<boolean>(false);


    async function amountCreditorUserActiveQueryPrivate(creditor_id: string, token: string|null) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/amount_creditor/user_active?id=${creditor_id}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
        };
        try {
            setLoadAmountCreditorUseActive(true);
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<number>;
            if (resData.status === 401) {
                // Permiso denegado
                alertInfoToast(resData.message);
                dispatch(setAmountCreditorUserActive(resData.data));
                navigate('/admin/session_ended');
                setLoadAmountCreditorUseActive(false);
                return;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                dispatch(setAmountCreditorUserActive(resData.data));
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                setLoadAmountCreditorUseActive(false);
                return;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                dispatch(setAmountCreditorUserActive(resData.data));
                alertInfoToast(resData.message);
                setLoadAmountCreditorUseActive(false);
                return;
            }
            dispatch(setAmountCreditorUserActive(resData.data));
            setLoadAmountCreditorUseActive(false);
        } catch (error) {
            console.error('**** error al obtener todas las cuentas');
            console.error(error);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            setLoadAmountCreditorUseActive(false);
            return;
        }
    }

    return {
        loadAmountCreditorUseActive,
        amountCreditorUserActiveQueryPrivate,
    };
}