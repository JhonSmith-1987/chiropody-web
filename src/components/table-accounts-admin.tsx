import {AccountDataModel} from "../models/account-data-model.ts";
import useAccountAdmin from "../hooks/use-account-admin.tsx";
import {getLocalStorageData} from "../utils/getLocalStorageData.ts";
import {UpdateStatusAccountModel} from "../models/update-status-account-model.ts";

interface Props {
    allAccounts: AccountDataModel[];
}

export default function TableAccountsAdmin({allAccounts}:Props) {

    const {updateStatusAccount} = useAccountAdmin();
    const token = getLocalStorageData('tkn_chiropody');

    async function handleChangeStatusAccount(status: string, account_id: string) {
        const new_status: string = status === 'active' ? 'inactive' : 'active';
        const data: UpdateStatusAccountModel = {status: new_status, account_id: account_id};
        await updateStatusAccount(data, token)
    }

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                {allAccounts.length > 0 &&
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-[20.6rem]">
                        <table className="min-w-full divide-y divide-gray-700">
                            <thead>
                            <tr>
                                <th scope="col"
                                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-0">
                                    Fecha
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Nombre
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Teléfono
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Dirección
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">
                                    Estado
                                </th>
                                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                            {allAccounts.map((account, index) => (
                                <tr key={index}>
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                        {account.startDate}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {account.name}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {account.phone}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {account.address}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {account.status === 'active' ? 'Activo' : 'Inactivo'}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                        <button onClick={() => handleChangeStatusAccount(account.status, account.id)} className="text-indigo-400 hover:text-indigo-300 mr-3">
                                            {account.status === 'active' ? 'Desactivar' : 'Activar'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                }
            </div>
        </div>
    )
}
