export function validatePhone(phone: string) {
    console.log(phone);
    if (phone === '') {
        return 'Campo requerido';
    }
    if (phone.length < 10) {
        return 'Teléfono debe contener 10 caracteres';
    }
    if (/\D/.test(phone)) {
        return 'Solo acepta números';
    }
    return true;
}