import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {useEffect, useState} from "react";

export default function useAuthHook() {
    
    const token = getLocalStorageData('tkn_chiropody');
    const [load, setLoad] = useState<boolean>(true);
    const [isSession, setIsSession] = useState<boolean>(false);

    useEffect(() => {
        if (token !== '') {
            setIsSession(true);
            setLoad(false);
            return;
        }
        setIsSession(false);
        setLoad(false);
    }, [token]);
    
    return {load, isSession};
    
}