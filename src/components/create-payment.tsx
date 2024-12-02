import ModalAction from "./modal-action.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {CreateTransactionModel, FormPaymentModel, FormTransactionModel} from "../models/transaction-data-model.ts";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {getCurrentDateFormatBogota} from "../utils/generate-format-date.ts";
import useTransactionHook from "../hooks/use-transaction-hook.tsx";
import {validateAmount} from "../utils/validateAmount.ts";
import ErrorsForm from "./errors-form.tsx";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

export default function CreatePayment({
                                          isOpen,
                                          closeModal,
                                      }: Props) {

    const {registerTransactionQueryPrivate,} = useTransactionHook();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormPaymentModel>();
    const token = getLocalStorageData('tkn_chiropody');
    const [loadCreatePayment, setLoadCreatePayment] = useState<boolean>(false);

    async function handleCreatePayment(data: FormPaymentModel) {
        console.log(data);
        setLoadCreatePayment(true);
        const dataCreated: CreateTransactionModel = {
            transaction_id: '',
            transaction_data: '',
            amount: parseInt(data.amount_data),
            type: 'expenses',
            status: 'approved',
            description: data.description === ''
                ? `Gasto por $${data.amount_data}, el día ${getCurrentDateFormatBogota()}`
                : `Gasto por $${data.amount_data}, por concepto de: ${data.description}, el dia ${getCurrentDateFormatBogota()}`,
        }
        const isCreated = await registerTransactionQueryPrivate(dataCreated, token);
        if (isCreated) {
            closeModal();
            reset();
            setLoadCreatePayment(false);
            return;
        }
        setLoadCreatePayment(false);
    }

    return (
        <ModalAction
            isOpen={isOpen}
            closeModal={closeModal}
            load={loadCreatePayment}
            onAction={handleSubmit(handleCreatePayment)}
        >
            <form className="flex flex-col w-full items-center justify-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    Pagar
                </h2>

                {/* input of amount */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                        Valor a pagar
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <div className="shrink-0 text-base text-gray-500 sm:text-sm">
                                $
                            </div>
                            <input
                                {...register('amount_data', {
                                    validate: validateAmount,
                                })}
                                id="amount"
                                type="text"
                                placeholder="0.00"
                                aria-describedby="price-currency"
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                        placeholder-gray-400 focus:ring-0 sm:text-sm"
                            />
                            <div
                                id="price-currency"
                                className="shrink-0 text-base text-gray-500 sm:text-sm"
                            >
                                COP
                            </div>
                        </div>
                    </div>
                    <ErrorsForm<FormTransactionModel>
                        errors={errors}
                        fieldName={"amount_data"}
                    />
                </div>

                {/* input of description */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-900">
                        Descripción
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <textarea
                                {...register('description')}
                                id="description"
                                placeholder="Escribe una descripción..."
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                 placeholder-gray-400 focus:ring-0 sm:text-sm resize-none"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                </div>

            </form>
        </ModalAction>
    )
}
