import toast from "react-hot-toast";

export function alertErrorToast(message: string) {
    toast.error(message, {
        style: {
            background: '#f56565', // Rojo
            color: '#ffffff',      // Texto blanco
            border: '1px solid #f56565',
            padding: '16px',
            borderRadius: '8px',
        },
        iconTheme: {
            primary: '#ffffff',    // Color del ícono
            secondary: '#f56565',  // Fondo del ícono
        },
    });
}