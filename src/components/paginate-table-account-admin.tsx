interface Props {
    totalCount: number;
    size: number;
    page: number;
    listCount: number;
    search: string;
    nextPaginate: () => void;
    prevPaginate: () => void;
}

export default function PaginateTableAccountAdmin({totalCount, size, page, listCount,search, prevPaginate, nextPaginate}:Props) {
    return (
        <nav
            aria-label="Pagination"
            className="flex items-center justify-between border-t border-gray-200 bg-transparent px-4 py-3 sm:px-6"
        >
            <div className="hidden sm:block">
                <p className="text-sm text-white">
                    Showing <span className="font-medium">{((page * size) + 1)}</span> to <span className="font-medium">{((page * size) + listCount)}</span> of{' '}
                    <span className="font-medium">{totalCount}</span> results
                </p>
            </div>
            {search === '' &&
                <div className="flex flex-1 justify-between sm:justify-end">
                    <button
                        onClick={prevPaginate}
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm
                                font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                                focus-visible:outline-offset-0"
                    >
                        Previous
                    </button>
                    <button
                        onClick={nextPaginate}
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2
                                text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300
                                hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Next
                    </button>
                </div>
            }
            {search !== '' &&
                <div className="flex flex-1 justify-between sm:justify-end">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
                    >
                        Next
                    </a>
                </div>
            }
        </nav>
    )
}
