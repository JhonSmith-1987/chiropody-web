import ButtonSubmit from "./button-submit.tsx";

export default function SignInComponent() {

    return (
        <form className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                    Correo electrónico
                </label>
                <div className="mt-2">
                    <input
                        autoFocus
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <div>
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
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm/6"
                    />
                </div>
            </div>

            <label
                className="flex items-center justify-start gap-2 text-sm font-semibold text-indigo-400 hover:text-indigo-300 cursor-pointer">
                <input
                    id="comments"
                    name="comments"
                    type="checkbox"
                    aria-describedby="comments-description"
                    className="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                />
                Recordar correo
            </label>

            <ButtonSubmit
                text_button="Sign in"
                isLoad={false}
            />
        </form>
    );
}