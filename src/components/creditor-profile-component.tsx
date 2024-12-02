import {CheckCircleIcon, PencilIcon, XCircleIcon} from "@heroicons/react/16/solid";
import {CreditorDataModel} from "../models/creditor-data-model.ts";
import {useEffect, useState} from "react";
import useCreditorHook from "../hooks/use-creditor-hook.tsx";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import ButtonLoadComponent from "./button-load-component.tsx";

interface Props {
    singleCreditor: CreditorDataModel | null;
}

export default function CreditorProfileComponent({singleCreditor}: Props) {

    const {updateCreditorQueryPrivate, loadUpdateCreditor} = useCreditorHook();
    const token = getLocalStorageData('tkn_chiropody');
    const [editableFields, setEditableFields] = useState<{ [key: string]: boolean }>({});
    const [name, setName] = useState<string>('');
    const [identification, setIdentification] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');

    useEffect(() => {
        if (singleCreditor) {
            setName(singleCreditor.name);
            setIdentification(singleCreditor.identification);
            setPhone(singleCreditor.phone);
            setAddress(singleCreditor.address);
        }
    }, [singleCreditor]);

    function activateField(field: string) {
        setEditableFields({[field]: true});
    }

    function deactivateField() {
        if (singleCreditor) {
            setEditableFields({['']: false});
            setName(singleCreditor.name);
            setIdentification(singleCreditor.identification);
            setPhone(singleCreditor.phone);
            setAddress(singleCreditor.address);
        }
    }

    async function handleUpdateCredit() {
        if (singleCreditor && token) {
            if (name !== singleCreditor.name) {
                await updateCreditorQueryPrivate(
                    {name: name},
                    singleCreditor.id,
                    token,
                );
                setEditableFields({});
                return;
            }
            if (identification !== singleCreditor.identification) {
                await updateCreditorQueryPrivate(
                    {identification: identification},
                    singleCreditor.id,
                    token,
                );
                setEditableFields({});
                return;
            }
            if (phone !== singleCreditor.phone) {
                await updateCreditorQueryPrivate(
                    {phone: phone},
                    singleCreditor.id,
                    token,
                );
                setEditableFields({});
                return;
            }
            if (address !== singleCreditor.address) {
                await updateCreditorQueryPrivate(
                    {address: address},
                    singleCreditor.id,
                    token,
                );
                setEditableFields({});
                return;
            }
        }
    }

    return (
        <div className="mt-6 border-t border-white/10">
            {!loadUpdateCreditor &&
                <dl className="divide-y divide-white/10">

                    {/* creditor name */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-4">
                        <dt className="text-sm/6 font-medium text-white">Nombre</dt>
                        <input
                            className={`
                            mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 w-auto
                            ${
                                editableFields['name']
                                    ?
                                    'border border-gray-300'
                                    :
                                    'bg-transparent border-none focus:outline-none focus:ring-0'
                            }
                        `}
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            readOnly={!editableFields['name']}
                        />
                        <div className="flex items-center justify-end">
                            <button className="flex gap-4 text-indigo-400 hover:text-indigo-300 mr-3">
                                {!editableFields['name'] ? (
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green-500"
                                        onClick={() => activateField('name')}
                                    />
                                ) : (
                                    <>
                                        <XCircleIcon
                                            className="h-6 w-6 text-red-500"
                                            onClick={() => deactivateField()}
                                        />
                                        {singleCreditor && singleCreditor.name !== name &&
                                            <PencilIcon
                                                className="h-6 w-6 text-blue-500"
                                                onClick={handleUpdateCredit}
                                            />
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* identification */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-4">
                        <dt className="text-sm/6 font-medium text-white">Identificación</dt>
                        <input
                            className={`
                            mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 w-auto
                            ${
                                editableFields['identification']
                                    ? 'border border-gray-300'
                                    :
                                    'bg-transparent border-none focus:outline-none focus:ring-0'
                            }
                        `}
                            value={identification}
                            onChange={(event) => setIdentification(event.target.value)}
                            readOnly={!editableFields['identification']}
                        />
                        <div className="flex items-center justify-end">
                            <button className="flex gap-4 text-indigo-400 hover:text-indigo-300 mr-3">
                                {!editableFields['identification'] ? (
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green-500"
                                        onClick={() => activateField('identification')}
                                    />
                                ) : (
                                    <>
                                        <XCircleIcon
                                            className="h-6 w-6 text-red-500"
                                            onClick={() => deactivateField()}
                                        />
                                        {singleCreditor && singleCreditor.identification !== identification &&
                                            <PencilIcon
                                                className="h-6 w-6 text-blue-500"
                                                onClick={handleUpdateCredit}
                                            />
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* phone */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-4">
                        <dt className="text-sm/6 font-medium text-white">Teléfono</dt>
                        <input
                            className={`
                            mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 w-auto
                            ${
                                editableFields['phone']
                                    ?
                                    'border border-gray-300'
                                    :
                                    'bg-transparent border-none focus:outline-none focus:ring-0'
                            }
                        `}
                            value={phone}
                            onChange={(event) => setPhone(event.target.value)}
                            readOnly={!editableFields['phone']}
                        />
                        <div className="flex items-center justify-end">
                            <button className="flex gap-4 text-indigo-400 hover:text-indigo-300 mr-3">
                                {!editableFields['phone'] ? (
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green-500"
                                        onClick={() => activateField('phone')}
                                    />
                                ) : (
                                    <>
                                        <XCircleIcon
                                            className="h-6 w-6 text-red-500"
                                            onClick={() => deactivateField()}
                                        />
                                        {singleCreditor && singleCreditor.phone !== phone &&
                                            <PencilIcon
                                                className="h-6 w-6 text-blue-500"
                                                onClick={handleUpdateCredit}
                                            />
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* address */}
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 lg:grid-cols-4">
                        <dt className="text-sm/6 font-medium text-white">Dirección</dt>
                        <input
                            className={`
                            mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0 w-auto
                            ${
                                editableFields['address']
                                    ?
                                    'border border-gray-300'
                                    :
                                    'bg-transparent border-none focus:outline-none focus:ring-0'
                            }
                        `}
                            value={address}
                            onChange={(event) => setAddress(event.target.value)}
                            readOnly={!editableFields['address']}
                        />
                        <div className="flex items-center justify-end">
                            <button className="flex gap-4 text-indigo-400 hover:text-indigo-300 mr-3">
                                {!editableFields['address'] ? (
                                    <CheckCircleIcon
                                        className="h-6 w-6 text-green-500"
                                        onClick={() => activateField('address')}
                                    />
                                ) : (
                                    <>
                                        <XCircleIcon
                                            className="h-6 w-6 text-red-500"
                                            onClick={() => deactivateField()}
                                        />
                                        {singleCreditor && singleCreditor.address !== address &&
                                            <PencilIcon
                                                className="h-6 w-6 text-blue-500"
                                                onClick={handleUpdateCredit}
                                            />
                                        }
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                </dl>
            }
            {loadUpdateCreditor &&
                <div className="flex w-full h-96 items-center justify-center">
                    <ButtonLoadComponent/>
                </div>
            }
        </div>
    );
}