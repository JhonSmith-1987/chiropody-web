import {useAppDispatch} from "../hooks/store-hook.ts";
import {useNavigate} from "react-router-dom";
import {setNavSelected} from "../store/actions/util-actions.ts";
import {removeItemLocalStorage} from "../utils/removeItemLocalStorage.ts";

export default function SessionEnded() {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    function goToBack() {
        removeItemLocalStorage('tkn_chiropody');
        dispatch(setNavSelected('/'));
        navigate('/');
    }

    return (
        <>
            <main className="relative isolate min-h-screen">
                <img
                    alt=""
                    src="https://images.unsplash.com/photo-1545972154-9bb223aac798?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=3050&q=80&exp=8&con=-15&sat=-75"
                    className="absolute inset-0 -z-10 size-full object-cover object-top"
                />
                <div className="mx-auto max-w-7xl px-6 py-32 text-center sm:py-40 lg:px-8">
                    <h1 className="mt-4 text-balance text-5xl font-semibold tracking-tight text-white sm:text-7xl">
                        Sesión expirada
                    </h1>
                    <p className="mt-6 text-pretty text-lg font-medium text-white/70 sm:text-xl/8">
                        Tu sesión ha expirado por inactividad. Por favor, inicia sesión nuevamente para continuar.
                    </p>
                    <div className="mt-10 flex justify-center">
                        <div onClick={goToBack} className="text-sm/7 font-semibold text-white cursor-pointer">
                            <span aria-hidden="true">&larr;</span> Volver
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
