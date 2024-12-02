export function validateAmount(amount:string) {
    if (amount === '') {
        return 'Campo requerido';
    }
    if (/\D/.test(amount)) {
        return 'Solo acepta números';
    }
    return true
}