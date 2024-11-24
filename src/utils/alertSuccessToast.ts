import toast from "react-hot-toast";

export function alertSuccessToast(message: string) {
    toast.success(message, {
        style: {
            background: '#4CAF50',  // Color verde de fondo
            color: '#fff',           // Color del texto
            border: '1px solid #4CAF50',
            padding: '16px',
            borderRadius: '8px',
        },
        iconTheme: {
            primary: '#fff',         // Color del ícono
            secondary: '#4CAF50',    // Fondo del ícono
        },
    });
}