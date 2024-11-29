// Declara el módulo global
export {};

declare global {
    interface Window {
        WompiCheckout: new (options: {
            currency: string;
            amountInCents: number;
            publicKey: string;
            reference: string;
            redirectUrl: string;
        }) => {
            open: () => void;
        };
    }
}
