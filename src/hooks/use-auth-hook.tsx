import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {useEffect, useState} from "react";

export default function useAuthHook() {

    const [load, setLoad] = useState<boolean>(true);
    const [isSession, setIsSession] = useState<boolean>(false);

    useEffect(() => {
        const token = getLocalStorageData('tkn_chiropody');
        if (!token) {
            setIsSession(false);
            setLoad(false);
        } else {
            setIsSession(true);
            setLoad(false);
        }
    }, []);
    
    return {load, isSession};
    
}