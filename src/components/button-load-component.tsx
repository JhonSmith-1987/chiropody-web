import LoadingComponent from "./loading-component.tsx";

export default function ButtonLoadComponent() {

    return (
        <>
            <button
                type="button"
                className="flex items-center justify-center mx-auto w-28 rounded-md px-2.5 py-1.5 text-sm
                        font-semibold text-white shadow-sm focus-visible:border-none focus-visible:no-underline
                        focus-visible:not-sr-only"
            >
                <LoadingComponent
                    type_loading="oval_buttons"
                />
            </button>
        </>
    );
}