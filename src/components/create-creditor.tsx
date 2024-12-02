import ModalAction from "./modal-action.tsx";
import {useState} from "react";
import {useForm} from "react-hook-form";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import ErrorsForm from "./errors-form.tsx";
import {FormCreateCreditor} from "../models/creditor-data-model.ts";
import useCreditorHook from "../hooks/use-creditor-hook.tsx";

interface Props {
    isOpen: boolean;
    closeModal: () => void;
}

export default function CreateCreditor({
                                              isOpen,
                                              closeModal,
                                          }: Props) {

    const {createCreditorQueryPrivate} = useCreditorHook();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<FormCreateCreditor>();
    const token = getLocalStorageData('tkn_chiropody');
    const [loadCreateCreditor, setLoadCreateCreditor] = useState<boolean>(false);

    async function handleCreateTransaction(data:FormCreateCreditor) {
        console.log(data);
        setLoadCreateCreditor(true);
        const dataCreated: FormCreateCreditor = {
            name: data.name,
            address: data.address,
            phone: `57${data.phone}`,
            identification: data.identification
        }
        const isCreated = await createCreditorQueryPrivate(dataCreated, token);
        if (isCreated) {
            closeModal();
            reset();
            setLoadCreateCreditor(false);
            return;
        }
        setLoadCreateCreditor(false);
    }

    return (
        <ModalAction
            isOpen={isOpen}
            closeModal={closeModal}
            load={loadCreateCreditor}
            onAction={handleSubmit(handleCreateTransaction)}
        >
            <form className="flex flex-col w-full items-center justify-start">
                <h2 className="text-2xl font-bold text-gray-900 mb-10">
                    Nuevo Acreedor
                </h2>

                {/* name of creditor */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900">
                        Nombre
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <input
                                {...register('name', {
                                    required: 'Campo requerido',
                                })}
                                id="name"
                                type="text"
                                placeholder=""
                                aria-describedby="name"
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                        placeholder-gray-400 focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </div>
                    <ErrorsForm<FormCreateCreditor>
                        errors={errors}
                        fieldName={"name"}
                    />
                </div>

                {/* identification of creditor */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="identification" className="block text-sm font-medium text-gray-900">
                        Identificación
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <input
                                {...register('identification', {
                                    required: 'Campo requerido',
                                })}
                                id="identification"
                                type="text"
                                placeholder=""
                                aria-describedby="name"
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                        placeholder-gray-400 focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </div>
                    <ErrorsForm<FormCreateCreditor>
                        errors={errors}
                        fieldName={"identification"}
                    />
                </div>

                {/* phone of creditor */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                        Teléfono
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <input
                                {...register('phone', {
                                    required: 'Campo requerido',
                                })}
                                id="phone"
                                type="text"
                                placeholder=""
                                aria-describedby="name"
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                        placeholder-gray-400 focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </div>
                    <ErrorsForm<FormCreateCreditor>
                        errors={errors}
                        fieldName={"phone"}
                    />
                </div>

                {/* address of creditor */}
                <div className="w-full lg:w-8/12">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-900">
                        Dirección
                    </label>
                    <div className="mt-2 mb-1">
                        <div
                            className="flex items-center rounded-md bg-white px-3 outline outline-1
                                    outline-gray-300 focus-within:outline-2 focus-within:outline-indigo-600"
                        >
                            <input
                                {...register('address', {
                                    required: 'Campo requerido',
                                })}
                                id="address"
                                type="text"
                                placeholder=""
                                aria-describedby="name"
                                className="block w-full border-none py-1.5 pl-2 text-base text-gray-900
                                        placeholder-gray-400 focus:ring-0 sm:text-sm"
                            />
                        </div>
                    </div>
                    <ErrorsForm<FormCreateCreditor>
                        errors={errors}
                        fieldName={"address"}
                    />
                </div>

            </form>
        </ModalAction>
    )
}
