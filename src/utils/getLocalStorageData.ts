import CryptoJS from 'crypto-js';
import {localStorageType} from "../models/localStorageType.ts";
import {SECRET_KEY} from "./keyCrypto.ts";

export function getLocalStorageData(key: localStorageType) {
    const encryptedToken = localStorage.getItem(key);
    if (encryptedToken) {
        const bytes = CryptoJS.AES.decrypt(encryptedToken, SECRET_KEY);
        return bytes.toString(CryptoJS.enc.Utf8);
    } else {
        return null;
    }
}