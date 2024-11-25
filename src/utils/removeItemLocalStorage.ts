import {localStorageType} from "../models/localStorageType.ts";

export function removeItemLocalStorage(key: localStorageType) {
    localStorage.removeItem(key);
}