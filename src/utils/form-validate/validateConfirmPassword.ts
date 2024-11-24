export function validateConfirmPassword(confirmPassword:string, password:string ) {
    if (password === '') {
        return 'El campo Contraseña es requerido'
    }
    if (confirmPassword === '') {
        return 'El campo Confirmar Contraseña es requerido'
    }
    if (password !== confirmPassword) {
        return 'Las contraseñas no coinciden'
    }
    return true;
}