import {FieldErrors, FieldValues, Path} from "react-hook-form";


interface Props<T extends FieldValues> {
    fieldName: Path<T>
    errors: FieldErrors<T>;
}

export default function ErrorsForm<T extends FieldValues>({errors, fieldName}:Props<T>) {

    const errorMessage = errors[fieldName]?.message as string|undefined;

    return (
        <>
            {typeof errorMessage === "string" && (
                <span className="text-sm bg-red-600 text-white px-4 py-1 rounded-sm">
                    {errorMessage}
                </span>
            )}
        </>
    );
}