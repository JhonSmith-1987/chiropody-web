import ModalAction from "./modal-action.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {validateAmount} from "../utils/validateAmount.ts";
import ErrorsForm from "./errors-form.tsx";
import {CreateTransactionCreditorModel, FormTransactionCreditorModel} from "../models/transaction-creditor-model.ts";
import {CreditorDataModel} from "../models/creditor-data-model.ts";
import useTransactionCreditorHook from "../hooks/use-transaction-creditor-hook.tsx";

interface Props {
    isOpen: boolean;
    singleCreditor: CreditorDataModel | null;
    closeModal: () => void;
}

export default function CreateCreditorTransaction({
                                                      isOpen,
                                                      singleCreditor,
                                                      closeModal,
                                                  }: Props) {

    const {registerTransactionCreditorQueryPrivate,} = useTransactionCreditorHook();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormTransactionCreditorModel>();
    const token = getLocalStorageData('tkn_chiropody');
    const [loadCreateTransactionCreditor, setLoadCreateTransactionCreditor] = useState<boolean>(false);

    async function handleCreateTransactionCreditor(data: FormTransactionCreditorModel) {
        if (singleCreditor) {
            console.log(data);
            setLoadCreateTransactionCreditor(true);
            const dataCreated: CreateTransactionCreditorModel = {
                amount: parseInt(data.amount_data),
                type: 'income',
                status: 'approved',
                description: data.description,
                creditor_id: singleCreditor.id,
            }
            const isCreated = await registerTransactionCreditorQueryPrivate(dataCreated, token);
            if (isCreated) {
                closeModal();
                reset();
                setLoadCreateTransactionCreditor(false);
                return;
            }
            setLoadCreateTransactionCreditor(false);
        }
    }

    return (
        <ModalAction
            isOpen={isOpen}
            closeModal={closeModal}
            load={loadCreateTransactionCreditor}
            onAction={handleSubmit(handleCreateTransactionCreditor)}
        >
            <form className="flex flex-col w-full items-center justify-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    Agregar Crédito
                </h2>

                {/* amount credit */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-900">
                        Valor a recargar
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
                    <ErrorsForm<FormTransactionCreditorModel>
                        errors={errors}
                        fieldName={"amount_data"}
                    />
                </div>

                {/* description of credit */}
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
                                {...register('description', {
                                    required: 'Campo requerido'
                                })}
                                id="description"
                                placeholder="Escribe una descripción..."
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                 placeholder-gray-400 focus:ring-0 sm:text-sm resize-none"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                    <ErrorsForm<FormTransactionCreditorModel>
                        errors={errors}
                        fieldName={"description"}
                    />
                </div>

            </form>
        </ModalAction>
    )
}
