import toast from "react-hot-toast";

export function alertInfoToast(message: string) {
    toast(message, {
        style: {
            background: '#3182ce', // Azul informativo
            color: '#ffffff',      // Texto blanco
            border: '1px solid #3182ce',
            padding: '16px',
            borderRadius: '8px',
        },
        iconTheme: {
            primary: '#ffffff',    // Color del ícono
            secondary: '#3182ce',  // Fondo del ícono
        },
    });
}
