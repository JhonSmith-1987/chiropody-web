import {FormRegisterModel} from "./form-register-model.ts";

export interface RegisterModel extends Omit<FormRegisterModel, 'confirm_password_user'> {}