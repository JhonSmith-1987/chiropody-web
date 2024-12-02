import {CreateTransactionModel, TransactionDataModel} from "../models/transaction-data-model.ts";
import {urlApi} from "../api/url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../models/response-server-with-data.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {alertSuccessToast} from "../utils/alertSuccessToast.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import useAmountTotalHook from "./use-amount-total-hook.tsx";

export default function useTransactionHook() {

    const {amountTotalUserActiveQueryPrivate,} = useAmountTotalHook();
    const navigate = useNavigate();

    async function registerTransactionQueryPrivate(data: CreateTransactionModel, token: string|null):Promise<boolean> {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/transaction/register_transaction`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            data: data,
        };
        try {
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<TransactionDataModel|null>;
            if (resData.status === 401) {
                // Permiso denegado
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return false;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return false;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                alertInfoToast(resData.message);
                return false;
            }
            await amountTotalUserActiveQueryPrivate(token);
            alertSuccessToast(resData.message);
            return true;
        } catch (error) {
            console.error('**** error al obtener todas las cuentas');
            console.error(error);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return false;
        }
    }

    return {
        registerTransactionQueryPrivate,
    };
}