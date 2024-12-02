import {CreditorDataModel} from "../models/creditor-data-model.ts";
import LoadingComponent from "./loading-component.tsx";
import {useNavigate} from "react-router-dom";

interface Props {
    allCreditors: CreditorDataModel[];
    load: boolean;
}

export default function TableCreditorsAdmin({allCreditors, load}:Props) {

    const navigate = useNavigate();

    function goTo(creditor_id: string) {
        navigate(`/admin/single_creditor/${creditor_id}`);
    }

    return (
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                {allCreditors.length > 0 &&
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8 h-[20.8rem] overflow-y-hidden">
                        {!load &&
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
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-800">
                                {allCreditors.map((creditor, index) => (
                                    <tr key={index}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-0">
                                            {creditor.startDate}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {creditor.name}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                            {creditor.phone}
                                        </td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                                            <button
                                                className="text-indigo-400 hover:text-indigo-300 mr-3"
                                                onClick={() => goTo(creditor.id)}
                                            >
                                                ir a
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        }
                        {load &&
                            <div
                                className="flex items-center justify-center min-w-full py-2 align-middle
                                        sm:px-6 lg:px-8 h-[20.6rem]"
                            >
                                <LoadingComponent
                                    type_loading={"oval_buttons"}
                                />
                            </div>
                        }
                    </div>
                }
            </div>
        </div>
    )
}
