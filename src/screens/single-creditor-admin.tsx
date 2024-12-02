import AdminLayout from "../layout/admin-layout.tsx";
import useAuthHook from "../hooks/use-auth-hook.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../hooks/store-hook.ts";
import {setNavSelected} from "../store/actions/util-actions.ts";
import {useNavigate, useParams} from "react-router-dom";
import NavOption from "../components/nav-option.tsx";
import {PagesNavOptionModel} from "../models/pages-nav-option-model.ts";
import useCreditorHook from "../hooks/use-creditor-hook.tsx";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import CreditorProfileComponent from "../components/creditor-profile-component.tsx";
import ButtonComponent from "../components/button-component.tsx";
import CreateCreditorTransaction from "../components/create-creditor-transaction.tsx";
import useAmountCreditorHook from "../hooks/use-amount-creditor-hook.tsx";

const pagesSingleCreditor: PagesNavOptionModel[] = [
    {name: 'Acreedores', href: '/admin/creditors', current: false},
]

export default function SingleCreditorAdmin() {

    const {load} = useAuthHook();
    const {loadSingleCreditor, getSingleCreditorQueryPrivate} = useCreditorHook();
    const {amountCreditorUserActiveQueryPrivate, loadAmountCreditorUseActive} = useAmountCreditorHook();
    const token = getLocalStorageData('tkn_chiropody');
    const dispatch = useAppDispatch();
    const {creditor_id} = useParams();
    const navigate = useNavigate();
    const singleCreditor = useAppSelector((state) => state.creditorState.singleCreditor);
    const amountCreditorUserActive = useAppSelector((state) => state.amountCreditorState.amountCreditorUserActive);
    const [isOpenModalCreateCreditorTransaction, setIsOpenModalCreateCreditorTransaction] = useState<boolean>(false);


    useEffect(() => {
        if (creditor_id) {
            getSingleCreditorQueryPrivate(creditor_id, token).then(() => {
                amountCreditorUserActiveQueryPrivate(creditor_id, token).then(() => {});
            });
        }
    }, [creditor_id, token]);

    useEffect(() => {
        dispatch(setNavSelected('/admin/creditors'));
    }, [dispatch]);

    if (load || loadSingleCreditor || loadAmountCreditorUseActive) {
        return <LoadSuspense/>;
    }

    function onRedirect(path: string) {
        navigate(path);
    }

    function openModalAddCredit() {
        setIsOpenModalCreateCreditorTransaction(true);
    }

    function closeModalAddCredit() {
        setIsOpenModalCreateCreditorTransaction(false);
    }

    return (
        <AdminLayout>
            <div className="bg-gray-900 min-h-screen">
                <div className="mx-auto max-w-7xl">
                    <div className="bg-gray-900 pt-10 tb-4">
                        <div className="px-4 sm:px-6 lg:px-8">

                            <NavOption
                                pages={pagesSingleCreditor}
                                onRedirect={onRedirect}
                            />

                            {/* info creditor */}
                            <div className="sm:flex sm:items-center">
                                <div className="sm:flex-auto">
                                    <h1 className="text-base font-semibold text-white">
                                        Información del acreedor {singleCreditor ? singleCreditor.name : ''}.
                                    </h1>
                                    <p className="mt-2 text-sm text-gray-300">
                                        ID: {singleCreditor ? singleCreditor.id : ''}
                                    </p>
                                    <p className="mt-2 text-sm text-gray-300">
                                        Deuda: ${amountCreditorUserActive}
                                    </p>
                                </div>
                                <div className="flex items-center justify-center">
                                    <ButtonComponent
                                        load={false}
                                        text_button={"Agregar crédito"}
                                        action_button={openModalAddCredit}/>
                                </div>
                            </div>

                            <CreditorProfileComponent
                                singleCreditor={singleCreditor}
                            />

                        </div>
                    </div>
                </div>
            </div>
            <CreateCreditorTransaction
                isOpen={isOpenModalCreateCreditorTransaction}
                singleCreditor={singleCreditor}
                closeModal={closeModalAddCredit}
            />
        </AdminLayout>
    );
}