export interface CustomerDataFormWompi {
    email: string;
    full_name: string;
    phone_number: string;
    phone_number_prefix: string;
    legal_id: string;
    legal_id_type: string;
    amount_in_cents: string;
}

export interface DataPayWompiModel extends CustomerDataFormWompi{
    src: string;
    render: string;
    public_key: string;
    currency: string;
    reference: string;
    signature: string;
    redirect_url: string;
}