import {HomeIcon} from '@heroicons/react/20/solid';
import {PagesNavOptionModel} from "../models/pages-nav-option-model.ts";
import {useNavigate} from "react-router-dom";

interface Props {
    pages: PagesNavOptionModel[];
    onRedirect: (path:string) => void;
}

export default function NavOption({pages, onRedirect}: Props) {

    const navigate = useNavigate();

    function redirectHome() {
        navigate('/admin/accounts');
    }

    return (
        <nav aria-label="Breadcrumb" className="flex mb-4">
            <ol role="list" className="flex space-x-4 rounded-md bg-transparent border border-indigo-900 px-6 shadow">
                <li className="flex">
                    <div className="flex items-center">
                        <div
                            className="text-gray-400 hover:text-gray-500 cursor-pointer"
                            onClick={redirectHome}
                        >
                            <HomeIcon aria-hidden="true" className="size-5 shrink-0"/>
                            <span className="sr-only">Home</span>
                        </div>
                    </div>
                </li>
                {pages.map((page) => (
                    <li key={page.name} className="flex">
                        <div className="flex items-center">
                            <svg
                                fill="currentColor"
                                viewBox="0 0 24 44"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                                className="h-full w-6 shrink-0 text-indigo-900"
                            >
                                <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z"/>
                            </svg>
                            <span
                                aria-current={page.current ? 'page' : undefined}
                                className={`
                                    ml-4 text-sm font-medium cursor-pointer
                                    ${page.current ? ' text-white hover:text-indigo-500' : ' text-gray-500 hover:text-gray-700'}
                                `}
                                onClick={() => onRedirect(page.href)}
                            >
                                {page.name}
                            </span>
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    )
}
