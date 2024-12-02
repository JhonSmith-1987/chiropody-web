import ButtonComponent from "./button-component.tsx";

interface Props {
    handleSearch: (value: string) => void;
    search: string;
    load: boolean;
    text_button: string;
    action_button: () => void;
}

export default function InputSearchWithButton({
                                                  search,
                                                  handleSearch,
                                                  load,
                                                  text_button,
                                                  action_button,
                                              }: Props) {
    return (
        <div
            className="lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full lg:mt-6
                    flex flex-col items-center justify-center mt-6 w-full gap-4"
        >
            <div className="relative flex items-center lg:w-10/12 w-full">
                <input
                    value={search}
                    onChange={(event) => handleSearch(event.target.value)}
                    type="search"
                    className="block w-full rounded-md border-0 py-1.5 pr-10 text-gray-900 shadow-sm ring-1
                            ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset
                            focus:ring-indigo-600 sm:text-sm/6"
                    placeholder="Buscar cuenta..."
                />
                <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                    <kbd
                        className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                        ⌘K
                    </kbd>
                </div>
            </div>
            <ButtonComponent
                load={load}
                text_button={text_button}
                action_button={action_button}
            />
        </div>
    )
}
