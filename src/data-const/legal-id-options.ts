import {LegalIdOptionsModel} from "../models/legal-id-options-model.ts";

export const legalIdOptions: LegalIdOptionsModel[] = [
    { value: "CC", label: "Cédula de Ciudadanía" },
    { value: "CE", label: "Cédula de Extranjería" },
    { value: "NIT", label: "Número de Identificación Tributaria" },
    { value: "PP", label: "Pasaporte" },
    { value: "TI", label: "Tarjeta de Identidad" },
    { value: "DNI", label: "Documento Nacional de Identidad" },
    { value: "RG", label: "Carteira de Identidade / Registro Geral" },
    { value: "OTHER", label: "Otro" },
];