import LoadingComponent from "./loading-component.tsx";

interface Props {
    load: boolean;
    text_button: string;
    action_button: () => void;
}

export default function ButtonFormCancelComponent({
                                                load,
                                                text_button,
                                                action_button,
                                            }: Props) {

    return (
        <>

            {!load &&
                <button
                    type="button"
                    onClick={action_button}
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2
                                        text-sm font-semibold text-white shadow-sm ring-1
                                        ring-inset ring-gray-300 hover:bg-red-500 sm:col-start-1 sm:mt-0"
                >
                    {text_button}
                </button>
            }

            {load &&
                <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2
                                        text-sm font-semibold text-white shadow-sm hover:bg-indigo-500
                                        focus-visible:outline focus-visible:outline-2
                                        focus-visible:outline-offset-2 focus-visible:outline-indigo-600
                                        sm:col-start-2"
                >
                    <LoadingComponent
                        type_loading="oval_buttons"
                    />
                </button>
            }
        </>
    );
}