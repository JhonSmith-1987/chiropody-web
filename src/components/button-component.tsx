import LoadingComponent from "./loading-component.tsx";

interface Props {
    load:boolean;
    text_button:string;
    action_button: () => void;
}

export default function ButtonComponent({load, text_button, action_button}:Props) {

    return (
        <>
            {!load &&
                <button
                    type="button"
                    className="flex items-center justify-center mx-auto rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm
                            font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                    onClick={action_button}
                >
                    {text_button}
                </button>
            }

            {load &&
                <button
                    type="button"
                    className="flex items-center justify-center mx-auto w-28 rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white
                            shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2
                            focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    <LoadingComponent
                        type_loading="oval_buttons"
                    />
                </button>
            }
        </>
    );
}