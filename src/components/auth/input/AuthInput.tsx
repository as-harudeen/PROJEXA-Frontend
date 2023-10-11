import { FC, Ref, forwardRef } from "react";
import { Input } from "@components/custom/Input";

export interface AuthInputProps {
  label: string;
  placeholder: string;
  isDisabled?: boolean;
}

export const AuthInput: FC<AuthInputProps> = forwardRef(
  ({ label, placeholder, isDisabled, ...rest }, ref) => {
    return (
      <Input
        isDisabled={isDisabled || false}
        ref={ref as Ref<HTMLInputElement>}
        {...rest}
        type="text"
        label={label}
        labelPlacement="outside"
        placeholder={placeholder}
        color="border"
        variant="bordered"
        size="custom"
        className="w-full"
        classNames={{
          label: ["md:text-sm", "font-light", "text-sm", "font-poppins"],
          inputWrapper: ["rounded-[18px]", "border", "border-light_hash"],
        }}
      />
    );
  }
);
