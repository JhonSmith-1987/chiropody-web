import AdminLayout from "../layout/admin-layout.tsx";
import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {Navigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/store-hook.ts";
import {setNavSelected} from "../store/actions/util-actions.ts";
import TableAccountsAdmin from "../components/table-accounts-admin.tsx";
import InputSearch from "../components/input-search.tsx";
import PaginateTableAccountAdmin from "../components/paginate-table-account-admin.tsx";
import useAccountAdmin from "../hooks/use-account-admin.tsx";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";

export default function AccountsAdmin() {

    const {isSession, load} = useAuthHook();
    const {getAllAccounts} = useAccountAdmin();
    const dispatch = useAppDispatch();
    const token = getLocalStorageData('tkn_chiropody');
    const allAccounts = useAppSelector((state) => state.accountState.allAccounts);
    const size = 1;
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        getAllAccounts({
            search: '',
            page: '0',
            size: size.toString(),
            type: 'all'
        }, token).then(() => {
            dispatch(setNavSelected('/admin/accounts'));
        });
    }, [dispatch, token]);

    if (load) {
        return <LoadSuspense/>;
    }

    if (!isSession) {
        return <Navigate to="/"/>;
    }

    async function nextPaginate() {
        const newPage = page + 1;
        await getAllAccounts({
            search: '',
            page: newPage.toString(),
            size: size.toString(),
            type: 'all'
        }, token);
        setPage(newPage);
    }

    async function prevPaginate() {
        if (page > 0) {
            const newPage = page - 1;
            await getAllAccounts({
                search: '',
                page: newPage.toString(),
                size: size.toString(),
                type: 'all'
            }, token);
            setPage(newPage);
        }
    }

    function handleSearch(value: string) {
        setSearch(value);
    }

    return (
        <AdminLayout>
            <div className="bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-gray-900 py-10">
                        <div className="px-4 sm:px-6 lg:px-8">

                            {/* button create account */}
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-white">
                                        Mis cuentas
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-300">
                                        Una lista de todos las cuentas.
                                    </p>
                                </div>
                            </div>

                            {/* search */}
                            <InputSearch
                                search={search}
                                handleSearch={(value) => handleSearch(value)}
                            />

                            {/* table accounts */}
                            <TableAccountsAdmin
                                allAccounts={allAccounts ? allAccounts.data : []}
                            />

                            {/* pagination */}
                            <PaginateTableAccountAdmin
                                totalCount={allAccounts ? allAccounts.total_count : 0}
                                page={page}
                                size={size}
                                listCount={allAccounts ? allAccounts.data.length : 0}
                                search={search}
                                nextPaginate={nextPaginate}
                                prevPaginate={prevPaginate}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}