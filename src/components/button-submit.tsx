import {Oval} from "react-loader-spinner";

interface Props {
    text_button: string;
    isLoad: boolean;
}

export default function ButtonSubmit({text_button, isLoad}:Props) {

    return (
        <div>
            {!isLoad &&
                <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    {text_button}
                </button>
            }
            {isLoad &&
                <button
                    type="button"
                    disabled={true}
                    className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm/6
                            font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline
                            focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                    <Oval
                        visible={true}
                        height="20"
                        width="20"
                        color="blue"
                        secondaryColor="white"
                        ariaLabel="three-circles-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </button>
            }
        </div>
    );
}