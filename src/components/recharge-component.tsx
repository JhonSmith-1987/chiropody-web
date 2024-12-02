import ButtonComponent from "./button-component.tsx";
import {useState} from "react";
import CreateTransaction from "./create-transaction.tsx";
import useAmountTotalHook from "../hooks/use-amount-total-hook.tsx";
import {useAppSelector} from "../hooks/store-hook.ts";
import LoadingComponent from "./loading-component.tsx";
import CreatePayment from "./create-payment.tsx";

interface Props {
    show_button: boolean;
    type: string;
}

export default function RechargeComponent({show_button, type}: Props) {

    const {loadAmountUseActive,} = useAmountTotalHook();
    const amountTotalUserActive = useAppSelector((state) => state.amountState.amountTotalUserActive);
    const [isOpenModalCreateTransaction, setIsOpenModalCreateTransaction] = useState<boolean>(false);
    const [isOpenModalCreatePayment, setIsOpenModalCreatePayment] = useState<boolean>(false);

    function openModalCreateTransaction() {
        setIsOpenModalCreateTransaction(true);
    }

    function closeModalCreateTransaction() {
        setIsOpenModalCreateTransaction(false);
    }

    function openModalCreatePayment() {
        setIsOpenModalCreatePayment(true);
    }

    function closeModalCreatePayment() {
        setIsOpenModalCreatePayment(false);
    }

    return (
        <div className="bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                    MI SALDO
                </h2>
                {!loadAmountUseActive &&
                    <p className="mt-8 lg:mb-8 mb-4 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                        ${amountTotalUserActive}
                    </p>
                }
                {loadAmountUseActive &&
                    <div className="flex items-center justify-center mt-8 lg:mb-8 mb-4 text-pretty text-lg font-medium text-gray-400 sm:text-xl/8">
                        <LoadingComponent
                            type_loading={"oval_buttons"}
                        />
                    </div>
                }
                {show_button && type === 'recharge' &&
                    <ButtonComponent
                        load={false}
                        text_button={"Recargar cuenta"}
                        action_button={openModalCreateTransaction}
                    />
                }
                {show_button && type === 'payment' &&
                    <ButtonComponent
                        load={false}
                        text_button={"Pagos"}
                        action_button={openModalCreatePayment}
                    />
                }
            </div>

            <CreateTransaction
                isOpen={isOpenModalCreateTransaction}
                closeModal={closeModalCreateTransaction}
            />

            <CreatePayment
                isOpen={isOpenModalCreatePayment}
                closeModal={closeModalCreatePayment}
            />

        </div>
    )
}
