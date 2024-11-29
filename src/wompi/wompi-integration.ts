export const initializeWompiWidget = (
    publicKey: string,
    amountInCents: number,
    currency: string,
    reference: string,
    redirectUrl: string
) => {
    if (window.WompiCheckout) {
        const checkout = new window.WompiCheckout({
            currency,
            amountInCents,
            publicKey,
            reference,
            redirectUrl,
        });

        checkout.open();
    } else {
        console.error('Wompi Widget is not loaded.');
    }
};
