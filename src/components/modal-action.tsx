import {Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react';
import {ReactNode} from "react";
import ButtonFormComponent from "./button-form-component.tsx";
import ButtonFormCancelComponent from "./button-form-cancel-component.tsx";

interface Props {
    isOpen: boolean;
    load: boolean;
    closeModal: () => void;
    onAction: () => void;
    children: ReactNode;
}

export default function ModalAction({
                                        isOpen,
                                        load,
                                        closeModal,
                                        onAction,
                                        children,
                                    }: Props) {

    return (
        <Dialog open={isOpen} onClose={closeModal} className="relative z-50">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0
                        data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out
                        data-[leave]:ease-in"
            />

            <div className="fixed inset-0 z-40 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5
                                text-left shadow-xl transition-all data-[closed]:translate-y-4 lg:max-w-4xl
                                data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200
                                data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg
                                sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                        <div>
                            {children}
                        </div>
                        <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                            <ButtonFormComponent
                                load={load}
                                text_button={"Agregar"}
                                action_button={onAction}
                            />
                            <ButtonFormCancelComponent
                                load={false}
                                text_button={"Cancelar"}
                                action_button={closeModal}
                            />
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    )
}
