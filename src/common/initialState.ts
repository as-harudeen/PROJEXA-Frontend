import { LoginFormInterface, RegisterFormInterface } from "../interfaces/Auth"

export const RegisterFormInitialState:RegisterFormInterface = {
    user_name: "",
    user_email: "",
    password: "",
    confirm_password: ""
}


export const LoginFromInitialState: LoginFormInterface = {
    user_email: "",
    password: ""
}