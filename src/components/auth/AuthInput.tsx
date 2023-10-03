import { FC, Ref, forwardRef } from "react";
import { Input } from "@nextui-org/react";
import { AuthInputProps } from "./props";

export const AuthInput: FC<AuthInputProps> = forwardRef(({ label, placeholder,isDisabled, ...rest }, ref) => {
  return (
    <Input
    isDisabled={isDisabled || false}
      ref={ref as Ref<HTMLInputElement>}
      {...rest}
      type="text"
      label={label}
      labelPlacement="outside"
      placeholder={placeholder}
      color="secondary"
      variant="bordered"
      size="lg"
      className="w-full"
      classNames={{
        label: ["md:text-sm", "font-light", "text-sm", "font-poppins"],
        inputWrapper: ["rounded-[18px]", "border", "border-light_hash"],
        input: ["placeholder:text-sm"],
      }}
    />
  );
})
