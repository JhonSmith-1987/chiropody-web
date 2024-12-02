import {urlApi} from "../api/url-api.ts";
import axios from "axios";
import {ResponseServerWithData} from "../models/response-server-with-data.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {alertSuccessToast} from "../utils/alertSuccessToast.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {CreditorDataModel, FormCreateCreditor, UpdateCreditorModel} from "../models/creditor-data-model.ts";
import {PaginateSearchModel} from "../models/paginate-search-model.ts";
import {ResponsePaginateSearchModel} from "../models/response-paginate-search-model.ts";
import {useAppDispatch} from "./store-hook.ts";
import {setPaginateSearchCreditors, setSingleCreditor} from "../store/actions/creditor-actions.ts";
import {useEffect, useState} from "react";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";

export default function useCreditorHook() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = getLocalStorageData('tkn_chiropody');
    const [loadPaginateSearchCreditors, setLoadPaginateSearchCreditors] = useState<boolean>(false);
    const [loadSingleCreditor, setLoadSingleCreditor] = useState<boolean>(false);
    const [loadUpdateCreditor, setLoadUpdateCreditor] = useState<boolean>(false);

    useEffect(() => {
        getPaginateSearchCreditorsQueryPrivate(
            {
                page: '0',
                size: '5',
                type: 'all',
                search: ''
            },
            token
        ).then(() => {});
    }, [token]);
    
    async function createCreditorQueryPrivate(data: FormCreateCreditor, token: string|null):Promise<boolean> {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/creditor/create`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            data: data,
        };
        try {
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<CreditorDataModel|null>;
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
            getPaginateSearchCreditorsQueryPrivate(
                {
                    search: '',
                    type: 'all',
                    size: '5',
                    page: '0'
                },
                token,
            ).then(() => {});
            alertSuccessToast(resData.message);
            return true;
        } catch (error) {
            console.error('**** error al crear nuevo acreedor');
            console.error(error);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return false;
        }
    }

    async function getPaginateSearchCreditorsQueryPrivate(data: PaginateSearchModel, token: string|null) {
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/creditor/paginate_search`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            data: data,
        };
        try {
            setLoadPaginateSearchCreditors(true);
            const response = await axios.request(config);
            const resData = response.data as ResponsePaginateSearchModel<CreditorDataModel[]>;
            if (resData.status === 401) {
                // Permiso denegado
                setLoadPaginateSearchCreditors(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                setLoadPaginateSearchCreditors(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                setLoadPaginateSearchCreditors(false);
                alertInfoToast(resData.message);
                return;
            }
            if (resData.status === 201) {
                setLoadPaginateSearchCreditors(false);
                alertInfoToast(resData.message);
            }
            setLoadPaginateSearchCreditors(false);
            dispatch(setPaginateSearchCreditors(resData));
        } catch (error) {
            console.error('**** error al paginar o buscar acreedores');
            console.error(error);
            setLoadPaginateSearchCreditors(false);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return;
        }
    }

    async function getSingleCreditorQueryPrivate(creditor_id: string, token: string|null) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/creditor/by_id?id=${creditor_id}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
        };
        try {
            setLoadSingleCreditor(true);
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<CreditorDataModel|null>;
            if (resData.status === 401) {
                // Permiso denegado
                setLoadSingleCreditor(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                setLoadSingleCreditor(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                setLoadSingleCreditor(false);
                alertInfoToast(resData.message);
                return;
            }
            if (resData.status === 201) {
                setLoadSingleCreditor(false);
                alertInfoToast(resData.message);
            }
            setLoadSingleCreditor(false);
            dispatch(setSingleCreditor(resData.data));
        } catch (error) {
            console.error('**** error al paginar o buscar acreedores');
            console.error(error);
            setLoadSingleCreditor(false);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return;
        }
    }

    async function updateCreditorQueryPrivate(data: UpdateCreditorModel, creditor_id: string, token: string|null) {
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${urlApi}/api/private/creditor/update?id=${creditor_id}`,
            headers: {
                'authorization': `Bearer ${token}`
            },
            data: data,
        };
        try {
            setLoadUpdateCreditor(true);
            const response = await axios.request(config);
            const resData = response.data as ResponseServerWithData<CreditorDataModel|null>;
            if (resData.status === 401) {
                // Permiso denegado
                setLoadUpdateCreditor(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 403) {
                // Su sesión a expirado
                setLoadUpdateCreditor(false);
                alertInfoToast(resData.message);
                navigate('/admin/session_ended');
                return;
            }
            if (resData.status === 404) {
                // No se encotraron datos
                setLoadUpdateCreditor(false);
                alertInfoToast(resData.message);
                return;
            }
            if (resData.status === 201) {
                setLoadUpdateCreditor(false);
                alertInfoToast(resData.message);
            }
            setLoadUpdateCreditor(false);
            dispatch(setSingleCreditor(resData.data));
        } catch (error) {
            console.error('**** error al actualizar acreedor');
            console.error(error);
            setLoadUpdateCreditor(false);
            alertErrorToast('Internal server error');
            navigate('/admin/server_error');
            return;
        }
    }

    return {
        loadPaginateSearchCreditors,
        loadSingleCreditor,
        loadUpdateCreditor,
        createCreditorQueryPrivate,
        getPaginateSearchCreditorsQueryPrivate,
        getSingleCreditorQueryPrivate,
        updateCreditorQueryPrivate,
    };
}