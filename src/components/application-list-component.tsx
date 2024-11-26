import {projects} from "../data-const/application-data.ts";

export default function ApplicationListComponent() {

    return (
        <ul role="list" className="divide-y divide-gray-100 mt-8">
            {projects.map((project,index) => (
                <li key={index} className="flex items-center justify-between gap-x-6 py-5">
                    <div className="min-w-0">
                        <div className="flex items-start gap-x-3">
                            <p className="text-sm/6 font-semibold text-white">{project.name}</p>
                        </div>
                        <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                            <p className="whitespace-nowrap">
                                Creado <time dateTime={project.dueDateTime}>{project.dueDate}</time>
                            </p>
                            <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                                <circle r={1} cx={1} cy={1}/>
                            </svg>
                            <p className="truncate">Creado por {project.createdBy}</p>
                        </div>
                    </div>
                    <div className="flex flex-none items-center gap-x-4">
                        <button
                            className="hidden rounded-md bg-white px-6 py-1.5 text-sm font-semibold
                                    text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50
                                    sm:block cursor-pointer"
                        >
                            ir a<span className="sr-only">, {project.name}</span>
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}