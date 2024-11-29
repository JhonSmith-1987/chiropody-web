interface AllPaymentMethodsModel {
    name: string;
    key: PaymentMethodSelected;
    image: string;
}

export type PaymentMethodSelected = '' | 'BANCOLOMBIA_TRANSFER' | 'BANCOLOMBIA_COLLECT' | 'CARD' | 'PSE' | 'NEQUI' | 'DAVIPLATA';

export const allPaymentMethods: AllPaymentMethodsModel[] = [
    {
        key: "BANCOLOMBIA_TRANSFER",
        name: "Transfiere con tu cuenta ahorros o corriente Bancolombia",
        image: '/img/img-transactions/LogoBancolombia.png'
    },
    {
        key: "BANCOLOMBIA_COLLECT",
        name: "Paga en efectivo en corresponsal Bancolombia",
        image: '/img/img-transactions/logo-bancolombia.jpg'
    },
    {
        key: "CARD",
        name: "Paga con tus tarjetas Débito o Crédito",
        image: '/img/img-transactions/card-method-removebg-preview.png'
    },
    {
        key: "PSE",
        name: "Paga con tu cuenta PSE",
        image: '/img/img-transactions/pse.png'
    },
    {
        key: "NEQUI",
        name: "Paga con tu cuenta Nequi",
        image: '/img/img-transactions/nequi.png'
    },
    {
        key: "DAVIPLATA",
        name: "Paga con Daviplata",
        image: '/img/img-transactions/daviplata.png'
    },
];