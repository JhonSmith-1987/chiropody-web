import AdminLayout from "../layout/admin-layout.tsx";
import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {useEffect, useRef, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/store-hook.ts";
import PaginateTableAccountAdmin from "../components/paginate-table-account-admin.tsx";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {generateStopPaginate} from "../utils/generateStopPaginate.ts";
import CreateCreditor from "../components/create-creditor.tsx";
import InputSearchWithButton from "../components/input-search-with-button.tsx";
import useCreditorHook from "../hooks/use-creditor-hook.tsx";
import TableCreditorsAdmin from "../components/table-creditors-admin.tsx";
import {setNavSelected} from "../store/actions/util-actions.ts";

export default function CreditorsAdmin() {

    const {load} = useAuthHook();
    const {loadPaginateSearchCreditors, getPaginateSearchCreditorsQueryPrivate,} = useCreditorHook();
    const dispatch = useAppDispatch();
    const token = getLocalStorageData('tkn_chiropody');
    const creditorsData = useAppSelector((state) => state.creditorState.creditorsData);
    const size = 5;
    const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [page, setPage] = useState<number>(0);
    const [search, setSearch] = useState<string>('');
    const [isOpenModalNewCreditor, setIsOpenModalNewCreditor] = useState<boolean>(false);

    useEffect(() => {
        dispatch(setNavSelected('/admin/creditors'));
    }, [dispatch]);

    useEffect(() => {
        console.log(loadPaginateSearchCreditors)
    }, [loadPaginateSearchCreditors]);

    if (load) {
        return <LoadSuspense/>;
    }

    async function nextPaginate() {
        if (creditorsData) {
            const stop_paginate = generateStopPaginate(creditorsData.total_count, size);
            if (page < stop_paginate) {
                const newPage = page + 1;
                await getPaginateSearchCreditorsQueryPrivate({
                    search: '',
                    page: newPage.toString(),
                    size: size.toString(),
                    type: 'all'
                }, token);
                setPage(newPage);
            }
        }
    }

    async function prevPaginate() {
        if (page > 0) {
            const newPage = page - 1;
            await getPaginateSearchCreditorsQueryPrivate({
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
        if (debounceTimeout.current) {
            clearTimeout(debounceTimeout.current);
        }
        debounceTimeout.current = setTimeout(() => {
            if (value === '') {
                getPaginateSearchCreditorsQueryPrivate({
                    search: '',
                    page: '0',
                    size: size.toString(),
                    type: 'all'
                }, token).then(() => {});
            } else {
                getPaginateSearchCreditorsQueryPrivate({
                    search: value,
                    page: '0',
                    size: size.toString(),
                    type: 'search'
                }, token).then(() => {});
            }
        }, 500);
    }

    function openModalNewCreditor() {
        setIsOpenModalNewCreditor(true);
    }

    function closeModalNewCreditor() {
        setIsOpenModalNewCreditor(false);
    }

    return (
        <AdminLayout>
            <div className="bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-gray-900 pt-10 tb-4">
                        <div className="px-4 sm:px-6 lg:px-8">

                            {/* button create account */}
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-white">
                                        Mis acredores
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-300">
                                        Una lista de todos los acreedores.
                                    </p>
                                </div>
                            </div>

                            <div className="flex lg:flex lg:flex-row lg:items-center lg:justify-between">
                                {/* search */}
                                <InputSearchWithButton
                                    search={search}
                                    handleSearch={(value) => handleSearch(value)}
                                    load={false}
                                    text_button={"Nuevo acreedor"}
                                    action_button={openModalNewCreditor}
                                />
                            </div>


                            {/* table accounts */}
                            <TableCreditorsAdmin
                                allCreditors={creditorsData ? creditorsData.data : []}
                                load={loadPaginateSearchCreditors}
                            />

                            {/* pagination */}
                            <PaginateTableAccountAdmin
                                totalCount={creditorsData ? creditorsData.total_count : 0}
                                page={page}
                                size={size}
                                listCount={creditorsData ? creditorsData.data.length : 0}
                                search={search}
                                nextPaginate={nextPaginate}
                                prevPaginate={prevPaginate}
                            />

                        </div>
                    </div>
                </div>
            </div>

            {/* modal create new creditor */}
            <CreateCreditor
                isOpen={isOpenModalNewCreditor}
                closeModal={closeModalNewCreditor}
            />

        </AdminLayout>
    );
}