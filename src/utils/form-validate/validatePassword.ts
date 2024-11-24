export function validatePassword(password:string) {
    if (password === '') {
        return 'Campo contraseña requeirdo';
    }
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!uppercaseRegex.test(password)) {
        return 'La contraseña debe contener al menos una letra mayúscula.';
    }
    if (!numberRegex.test(password)) {
        return 'La contraseña debe contener al menos un número.';
    }
    if (!specialCharRegex.test(password)) {
        return 'La contraseña debe contener al menos un símbolo especial.';
    }
    return true;
}