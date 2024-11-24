import SignInComponent from "../components/sign-in-component.tsx";
import {useEffect, useState} from "react";
import RegisterComponent from "../components/register-component.tsx";
import LoadSuspense from "../components/load-suspense.tsx";
import {Navigate} from "react-router-dom";
import useAuthHook from "../hooks/use-auth-hook.tsx";

export type TypesLogin = 'sign_in' | 'register';

export default function Login() {

    const {load, isSession} = useAuthHook();
    const [typeLogin, setTypeLogin] = useState<TypesLogin>('sign_in');

    useEffect(() => {
        console.log(isSession);
    }, [isSession]);

    if (load) {
        return <LoadSuspense/>
    }

    if (isSession) {
        return <Navigate to="/admin/accounts"/>
    }

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
