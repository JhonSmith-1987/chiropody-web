import SignInComponent from "../components/sign-in-component.tsx";
import {useState} from "react";
import RegisterComponent from "../components/register-component.tsx";

export type TypesLogin = 'sign_in' | 'register';

export default function Login() {

    const [typeLogin, setTypeLogin] = useState<TypesLogin>('sign_in');

    function handleChangeTypeLogin(type: TypesLogin) {
        setTypeLogin(type);
    }

    return (
        <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                    Inicia sesión en tu cuenta
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {typeLogin === 'sign_in' &&
                    <SignInComponent/>
                }
                {typeLogin === 'register' &&
                    <RegisterComponent
                        setTypeLogin={setTypeLogin}
                    />
                }
            </div>
            <p className="mt-10 text-center text-sm/6 text-gray-400">
                No tienes cuenta?{' '}
                {typeLogin === 'sign_in' &&
                    <span
                        className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                        onClick={() => handleChangeTypeLogin('register')}
                    >
                        Regístrate
                    </span>
                }
                {typeLogin === 'register' &&
                    <span
                        className="font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer"
                        onClick={() => handleChangeTypeLogin('sign_in')}
                    >
                        Iniciar sesión
                    </span>
                }
            </p>
        </div>
    )
}
