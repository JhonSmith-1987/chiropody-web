import {legalIdOptions} from "../data-const/legal-id-options.ts";
import {useForm} from "react-hook-form";
import {CustomerDataFormWompi, DataPayWompiModel} from "../wompi/models/form-pay-wompi-model.ts";
import {generateReferenceWompi} from "../wompi/generateReferenceWompi.ts";
import {generateHash} from "../wompi/generateHashWompi.ts";
import {useState} from "react";
import ConfirmWompiModal from "./confirm-wompi-modal.tsx";
import {redirectUrlWompi} from "../data-const/redirect-url-wompi.ts";


export default function FormDataWompiComponent() {

    const {
        register,
        handleSubmit,
    } = useForm<CustomerDataFormWompi>();
    const [dataWompin, setDataWompin] = useState<DataPayWompiModel|null>(null);
    const [isOpenWompiModal, setIsOpenWompiModal] = useState<boolean>(false);

    async function handleFormDataWompi(data: CustomerDataFormWompi) {
        console.log(data);
        const src:string= 'https://checkout.wompi.co/widget.js';
        const render: string = "button";
        const public_key: string = 'pub_test_hw6FwfmjzNIEtRs4XVPo4afMZ5Hq6NpI';
        const currency: string = "COP";
        const amount_in_cents: number = parseInt(data.amount_in_cents) * 100;
        console.log('paso los datos importantes de wompi 01');
        const reference: string = generateReferenceWompi();
        console.log(reference);
        const signature = await generateHash(reference, amount_in_cents, currency);
        console.log('No pasa del signature');
        const data_wompi: DataPayWompiModel = {
            email: data.email,
            currency: currency,
            src: src,
            amount_in_cents: amount_in_cents.toString(),
            full_name: data.full_name,
            legal_id: data.legal_id,
            reference: reference,
            legal_id_type: data.legal_id_type,
            phone_number: data.phone_number,
            render: render,
            public_key: public_key,
            signature: signature,
            phone_number_prefix: '+57',
            redirect_url: redirectUrlWompi,
        }
        console.log(data_wompi)
        setDataWompin(data_wompi);
        setIsOpenWompiModal(true);
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <form
                onSubmit={handleSubmit(handleFormDataWompi)}
                className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
            >
                <h2 className="text-2xl font-bold text-center mb-4">
                    User Information
                </h2>

                {/* value */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="amount_in_cents">
                        Valor
                    </label>
                    <input
                        {...register('amount_in_cents')}
                        type="text"
                        id="amount_in_cents"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring
                                focus:ring-blue-300"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Email */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring
                                focus:ring-blue-300"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Full Name */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="full_name">
                        Full Name
                    </label>
                    <input
                        {...register('full_name')}
                        type="text"
                        id="full_name"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter your full name"
                        required
                    />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                    <div className="col-span-3">
                        <label className="block text-sm font-bold mb-2" htmlFor="phone_number">
                            Phone Number
                        </label>
                        <input
                            {...register('phone_number')}
                            type="text"
                            id="phone_number"
                            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring
                                    focus:ring-blue-300"
                            placeholder="Enter phone number"
                            required
                        />
                    </div>
                </div>

                {/* Legal ID */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="legal_id">
                        Legal ID
                    </label>
                    <input
                        {...register('legal_id')}
                        type="text"
                        id="legal_id"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                        placeholder="Enter legal ID (e.g., CC number)"
                        required
                    />
                </div>

                {/* Legal ID Type */}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="legal_id_type">
                        Legal ID Type
                    </label>
                    <select
                        {...register('legal_id_type')}
                        id="legal_id_type"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    >
                        {legalIdOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition
                            duration-300"
                >
                    Submit
                </button>
            </form>

            <ConfirmWompiModal
                open={isOpenWompiModal}
                onClose={(action) => setIsOpenWompiModal(action)}
                dataWompin={dataWompin}
            />
        </div>
    );
}
