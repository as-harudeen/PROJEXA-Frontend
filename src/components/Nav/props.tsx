export interface ButtonProps {
    isLoginButton: boolean;
    styles?: string;
}

export interface NavProps {
    actived: "login" | "register";
}

export interface PasswordInputProps {
    label: string;
    placeholder: string;
    isDisabled?: boolean;
}