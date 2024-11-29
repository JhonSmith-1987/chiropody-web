import { useEffect } from "react";
import { DataPayWompiModel } from "../wompi/models/form-pay-wompi-model.ts";

interface Props {
    dataWompin: DataPayWompiModel | null;
}

export default function ButtonConfirmWompi({ dataWompin }: Props) {
    useEffect(() => {
        if (!dataWompin) return;

        // Crear el script
        const script = document.createElement("script");
        script.src = dataWompin.src;
        script.async = true;
        script.dataset.render = dataWompin.render;
        script.dataset.publicKey = dataWompin.public_key;
        script.dataset.currency = dataWompin.currency;
        script.dataset.amountInCents = dataWompin.amount_in_cents.toString();
        script.dataset.reference = dataWompin.reference;
        script.dataset.signatureIntegrity = dataWompin.signature;
        script.dataset.redirectUrl = dataWompin.redirect_url;
        script.dataset.customerDataEmail = dataWompin.email;
        script.dataset.customerDataFullName = dataWompin.full_name;
        script.dataset.customerDataPhoneNumber = dataWompin.phone_number;
        script.dataset.customerDataPhoneNumberPrefix = dataWompin.phone_number_prefix;
        script.dataset.customerDataLegalId = dataWompin.legal_id;
        script.dataset.customerDataLegalIdType = dataWompin.legal_id_type;

        // Agregar el script al formulario
        const form = document.getElementById("wompi-form");
        form?.appendChild(script);

        return () => {
            // Limpiar el script al desmontar el componente
            form?.removeChild(script);
        };
    }, [dataWompin]);

    if (!dataWompin) {
        return null; // Evitar renderizar si no hay datos
    }

    return <form id="wompi-form"></form>;
}
