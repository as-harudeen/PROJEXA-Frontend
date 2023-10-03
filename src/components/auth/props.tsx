export interface ButtonProps {
    text: string;
    isPrimary: boolean;
    icon?: React.ReactNode;
    isDisabled?: boolean;
}

export interface AuthInputProps {
    label: string;
    placeholder: string;
    isDisabled?: boolean;
}