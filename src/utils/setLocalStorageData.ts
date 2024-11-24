import CryptoJS from 'crypto-js';
import {localStorageType} from "../models/localStorageType.ts";
import {SECRET_KEY} from "./keyCrypto.ts";


export function setLocalStorageData(key: localStorageType, data: string) {
    const dataCrypt = CryptoJS.AES.encrypt(data, SECRET_KEY).toString();
    localStorage.setItem(key, dataCrypt);
}