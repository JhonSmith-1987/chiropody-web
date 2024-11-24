export function validateEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const emailOk = emailPattern.test(email);
    if (email === '') {
        return 'Campo requerido';
    }
    if (!emailOk) {
        return 'ejemplo@correo.com'
    }
    return true;
}