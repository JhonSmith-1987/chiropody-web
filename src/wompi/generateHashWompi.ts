import CryptoJS from 'crypto-js';

export async function generateHash(reference: string, amount_in_cents: number, currency: string) {
    const integritySecret = 'test_integrity_bgLnbOStuiOcWqi27fIx9NYp5aIuus3v';
    const text = `${reference}${amount_in_cents}${currency}${integritySecret}`;
    const hash = CryptoJS.SHA256(text);
    return hash.toString(CryptoJS.enc.Hex);
}
