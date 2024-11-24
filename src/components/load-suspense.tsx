import LoadingComponent from "./loading-component.tsx";

export default function LoadSuspense() {
    return (
        <div
            className="absolute top-0 left-0 w-full h-screen flex flex-col items-center justify-center bg-dark-primary_opacity">
            <LoadingComponent
                type_loading={"three_circles"}
            />
            <p className="text-dark-text-primary mb-4">Cargando</p>
        </div>
    )
}