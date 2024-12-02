import dayjs from "dayjs";
import "dayjs/locale/es"; // Importa el idioma español

// Configura la función para obtener la fecha actual en el formato deseado
export function getCurrentDateFormatBogota() {
    dayjs.locale("es");
    return dayjs().format("D [de] MMMM [de] YYYY");
}