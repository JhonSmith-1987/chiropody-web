import ButtonSubmit from "./button-submit.tsx";
import {useForm} from "react-hook-form";
import {LoginModel} from "../models/login-model.ts";
import {validateEmail} from "../utils/form-validate/validateEmail.ts";
import {loginQuery} from "../api/query/login-query.ts";
import {setLocalStorageData} from "../utils/setLocalStorageData.ts";
import {alertErrorToast} from "../utils/alertErrorToast.ts";
import {alertSuccessToast} from "../utils/alertSuccessToast.ts";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

export default function SignInComponent() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginModel>();
    const navigate = useNavigate();

    const [isLoadLogin, setIsLoadLogin] = useState<boolean>(false);

    async function handleLogin(data: LoginModel) {
        setIsLoadLogin(true);
        const response = await loginQuery(data);
        if (response.status === 200 && response.token && response.user_roll) {
            setLocalStorageData('tkn_chiropody', response.token);
            if (response.user_roll === 'super_admin') {
                navigate('/admin/accounts');
                reset();
                alertSuccessToast(response.message);
                setIsLoadLogin(false);
                return;
            }
            reset();
            alertSuccessToast(response.message);
            setIsLoadLogin(false);
            return;
        }
        alertErrorToast(response.message);
        setIsLoadLogin(false);
    }

    return (
        <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
            <div className="relative">
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                    Correo electrónico
                </label>
                <div className="mt-2">
                    <input
                        {...register('email', {
                            validate: validateEmail
                        })}
                        autoFocus
                        id="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm
                                ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset
                                focus:ring-indigo-500 sm:text-sm/6"
                    />
                </div>
                {errors.email?.type === 'validate' &&
                    <div
                        className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                        {errors.email.message}
                    </div>
                }
            </div>

            <div className="relative">
                <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                        Contraseña
                    </label>
                    <div className="text-sm">
                        <a href="#" className="font-semibold text-indigo-400 hover:text-indigo-300">
                            ¿Has olvidado tu contraseña?
                        </a>
                    </div>
                </div>
                <div className="mt-2">
                    <input
                        {...register('password', {
                            required: 'Campo requerido'
                        })}
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                    />
                </div>
                {errors.password?.type === 'required' &&
                    <div
                        className="absolute right-0 top-0 bg-neutral-950 px-4 rounded-sm text-white text-sm">
                        {errors.password.message}
                    </div>
                }
            </div>

            <label
                className="flex items-center justify-start gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">
                <input
                    id="comments"
                    type="checkbox"
                    aria-describedby="comments-description"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                Recordar correo
            </label>

            <ButtonSubmit
                text_button="Sign in"
                isLoad={isLoadLogin}
            />
        </form>
    );
}