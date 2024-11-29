import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {useEffect, useState} from "react";
import {useAppDispatch} from "./store-hook.ts";
import {setUserActive} from "../store/actions/user-actions.ts";
import {verifySessionQuery} from "../api/query/verify-session-query.ts";
import {useNavigate} from "react-router-dom";
import {alertInfoToast} from "../utils/alertInfoToast.ts";

export default function useAuthHook() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = getLocalStorageData('tkn_chiropody');
    const [load, setLoad] = useState<boolean>(true);
    const [isSession, setIsSession] = useState<boolean>(false);

    useEffect(() => {
        getSession(token).then(() => {});
    }, [token]);

    async function getSession(token:string|null) {
        if (!token) {
            dispatch(setUserActive(null));
            setIsSession(false);
            setLoad(false);
            navigate('/');
            return;
        }
        const session_data = await verifySessionQuery(token);
        if (session_data.status === 401) {
            dispatch(setUserActive(null));
            setIsSession(false);
            setLoad(false);
            alertInfoToast(session_data.message);
            navigate('/');
            return;
        }
        if (session_data.status === 403) {
            dispatch(setUserActive(null));
            setIsSession(false);
            setLoad(false);
            alertInfoToast(session_data.message);
            navigate('/');
            return;
        }
        dispatch(setUserActive(session_data.data));
        setIsSession(true);
        setLoad(false);
    }
    
    return {load, isSession};
}