import React, { Ref, forwardRef } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Input } from "@components/custom/Input";

interface PasswordInputProps {
  label: string;
  placeholder: string;
}

export const PasswordInput = forwardRef(
  ({ label, placeholder, ...rest }: PasswordInputProps, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        ref={ref as Ref<HTMLInputElement>}
        label={label}
        variant="bordered"
        placeholder={placeholder}
        labelPlacement="outside"
        color="border"
        size="custom"
        {...rest}
        classNames={{
          inputWrapper: ["rounded-[18px]", "border", "border-light_hash"],
          mainWrapper: ["md:h-full"],
        }}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <VisibilityOffIcon fontSize="small" />
            ) : (
              <VisibilityIcon
                fontSize="small"
                className="text-default-400 pointer-events-none"
              />
            )}
          </button>
        }
        type={isVisible ? "text" : "password"}
      />
    );
  }
);
