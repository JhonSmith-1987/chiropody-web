import ButtonSubmit from "./button-submit.tsx";
import {useForm} from "react-hook-form";
import {FormRegisterModel} from "../models/form-register-model.ts";
import {useState} from "react";
import {alertInfoToast} from "../utils/alertInfoToast.ts";
import {validatePhone} from "../utils/form-validate/validatePhone.ts";
import {validateEmail} from "../utils/form-validate/validateEmail.ts";
import {validatePassword} from "../utils/form-validate/validatePassword.ts";
import {validateConfirmPassword} from "../utils/form-validate/validateConfirmPassword.ts";
import {RegisterModel} from "../models/register-model.ts";
import {registerQuery} from "../api/query/register-query.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {alertSuccessToast} from "../utils/alertSuccessToast.ts";
import {TypesLogin} from "../screens/login.tsx";

interface Props {
    setTypeLogin: (type:TypesLogin) => void;
}

export default function RegisterComponent({setTypeLogin}:Props) {

    const {
        register,
        handleSubmit,
        formState: {errors},
        watch,
        reset,
    } = useForm<FormRegisterModel>();
    const pass = watch('password_user');
    const [termsAndConditions, setTermsAndConditions] = useState<boolean>(false);
    const [isLoadRegister, setIsLoadRegister] = useState<boolean>(false);

    async function handleRegisterUser(data: FormRegisterModel) {
        setIsLoadRegister(true);
        if (!termsAndConditions) {
            alertInfoToast('Debes aceptar términos y condiciones');
            setIsLoadRegister(false);
            return;
        }
        const register_data: RegisterModel = {
            name_account: data.name_account,
            address_account: data.address_account,
            phone_account: `57${data.phone_account}`,
            email_user: data.email_user,
            name_user: data.name_user,
            password_user: data.password_user,
            phone_user: `57${data.phone_user}`
        }
        const responseRegister = await registerQuery(register_data);
        if (responseRegister.status !== 200) {
            alertErrorToast(responseRegister.message);
            setIsLoadRegister(false);
            return;
        }
        setIsLoadRegister(false);
        alertSuccessToast(responseRegister.message);
        setTermsAndConditions(false);
        reset();
        setTypeLogin('sign_in');
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleRegisterUser)}>
            {/* Datos de la cuenta */}
            <div>
                <h3 className="text-lg font-medium text-white">Datos de la cuenta</h3>
                <hr className="border-white/20 my-4" />
                <div className="relative">
                    <label htmlFor="account_name" className="block text-sm/6 font-medium text-white">
                        Nombre de la cuenta
                    </label>
                    <div className="mt-2">
                        <input
                            autoFocus
                            {...register('name_account', {
                                required: 'Campo requerido'
                            })}
                            id="account_name"
                            type="text"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.name_account?.type === 'required' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.name_account.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="account_address" className="block text-sm/6 font-medium text-white">
                        Dirección
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('address_account', {
                                required: 'Campo requerido'
                            })}
                            id="account_address"
                            type="text"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.address_account?.type === 'required' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.address_account.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="account_phone" className="block text-sm/6 font-medium text-white">
                        Teléfono de la cuenta
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('phone_account', {
                                validate: validatePhone
                            })}
                            maxLength={10}
                            id="account_phone"
                            type="text"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.phone_account?.type === 'validate' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.phone_account.message}
                        </div>
                    }
                </div>
            </div>

            {/* Datos del usuario */}
            <div>
                <h3 className="text-lg font-medium text-white">Datos del usuario</h3>
                <hr className="border-white/20 my-4" />
                <div className="relative">
                    <label htmlFor="user_name" className="block text-sm/6 font-medium text-white">
                        Nombre completo
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('name_user', {
                                required: 'Campo requerido'
                            })}
                            id="user_name"
                            type="text"
                            autoComplete="name"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.name_user?.type === 'required' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.name_user.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="user_phone" className="block text-sm/6 font-medium text-white">
                        Teléfono del usuario
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('phone_user', {
                                validate: validatePhone
                            })}
                            id="user_phone"
                            type="tel"
                            autoComplete="tel"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.phone_user?.type === 'validate' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.phone_user.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="user_email" className="block text-sm/6 font-medium text-white">
                        Correo electrónico
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('email_user', {
                                validate: validateEmail
                            })}
                            id="user_email"
                            type="email"
                            autoComplete="email"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.email_user?.type === 'validate' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.email_user.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="user_password" className="block text-sm/6 font-medium text-white">
                        Contraseña
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('password_user', {
                                validate: validatePassword
                            })}
                            id="user_password"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.password_user?.type === 'validate' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                            {errors.password_user.message}
                        </div>
                    }
                </div>
                <div className="relative">
                    <label htmlFor="confirm_password" className="block text-sm/6 font-medium text-white">
                        Confirmar contraseña
                    </label>
                    <div className="mt-2">
                        <input
                            {...register('confirm_password_user', {
                                validate: value => validateConfirmPassword(value, pass),
                            })}
                            id="confirm_password"
                            type="password"
                            autoComplete="new-password"
                            className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                        />
                    </div>
                    {errors.confirm_password_user?.type === 'validate' &&
                        <div
                            className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm z-30">
                            {errors.confirm_password_user.message}
                        </div>
                    }
                </div>
            </div>

            <label
                className="flex items-center justify-start gap-2 text-sm font-semibold text-indigo-400
                        hover:text-indigo-300 cursor-pointer"
            >
                <input
                    checked={termsAndConditions}
                    id="accept_terms"
                    type="checkbox"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                    onChange={(event) => setTermsAndConditions(event.target.checked)}
                />
                Acepto los términos y condiciones
            </label>

            <ButtonSubmit
                text_button="Register"
                isLoad={isLoadRegister}
            />
        </form>
    );
}
