interface Props {
    handleSearch: (value: string) => void;
    search: string;
}

export default function InputSearch({search, handleSearch,}:Props) {
    return (
        <div className="flex items-center justify-start w-full">
            <div className="relative flex items-center mt-6 w-9/12">
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
                    <kbd className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                        ⌘K
                    </kbd>
                </div>
            </div>
        </div>
    )
}
