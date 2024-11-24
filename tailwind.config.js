/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Colores personalizados
                dark: {
                    primary: "#121212", // Fondo Principal
                    secondary: "#1E1E1E", // Fondo Secundario
                },
                neon: {
                    green: "#00FF66", // Verde Fosforescente
                },
                highlight: {
                    gold: "#FFD700", // Resaltado Dorado
                },
                warning: {
                    orange: "#FF4500", // Naranja para Advertencias
                },
                success: {
                    lime: "#32CD32", // Verde Lima para Éxito
                },
                text: {
                    primary: "#E0E0E0", // Texto Principal
                    secondary: "#B3B3B3", // Texto Secundario
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}

