import {urlApi} from "../api/url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../models/response-server-with-data.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {alertSuccessToast} from "../utils/alertSuccessToast.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {CreateTransactionCreditorModel, TransactionCreditorDataModel} from "../models/transaction-creditor-model.ts";
import useAmountCreditorHook from "./use-amount-creditor-hook.tsx";

export default function useTransactionCreditorHook() {

    const {amountCreditorUserActiveQueryPrivate} = useAmountCreditorHook();
    const navigate = useNavigate();

    async function registerTransactionCreditorQueryPrivate(data: CreateTransactionCreditorModel, token: string|null):Promise<boolean> {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/transaction_creditor/register_transaction_creditor`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            data: data,
        };
        try {
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<TransactionCreditorDataModel|null>;
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
            await amountCreditorUserActiveQueryPrivate(data.creditor_id, token);
            alertSuccessToast(resData.message);
            return true;
        } catch (error) {
            console.error('**** error al crear nuevo crédito');
            console.error(error);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return false;
        }
    }

    return {
        registerTransactionCreditorQueryPrivate,
    };
}