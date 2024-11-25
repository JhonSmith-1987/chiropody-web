import {useAppDispatch} from "./store-hook.ts";
import {AllSearchAccountsModel} from "../models/all-search-accounts-model.ts";
import {getAllAccountsQueryPrivate} from "../api/query/get-all-accounts-query-private.ts";
import {removeItemLocalStorage} from "../utils/removeItemLocalStorage.ts";
import {useNavigate} from "react-router-dom";
import {setAllAccount} from "../store/actions/account-actions.ts";

export default function useAccountAdmin() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    async function getAllAccounts(data: AllSearchAccountsModel, token: string|null) {
        if (!token) {
            removeItemLocalStorage('tkn_chiropody');
            dispatch(setAllAccount(null));
            navigate('/');
            return;
        }
        const responseAccounts = await getAllAccountsQueryPrivate(data, token);
        if (responseAccounts.status !== 200 && responseAccounts.status !== 500) {
            removeItemLocalStorage('tkn_chiropody');
            dispatch(setAllAccount(null));
            navigate('/');
            return;
        }
        dispatch(setAllAccount(responseAccounts));
    }

    return {getAllAccounts}
}