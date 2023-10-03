import React, { Ref, forwardRef } from "react";
import { Input } from "@nextui-org/react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { PasswordInputProps } from "../Nav/props";

export const PasswordInput = forwardRef(
  ({ label, placeholder, isDisabled, ...rest }: PasswordInputProps, ref) => {
    const [isVisible, setIsVisible] = React.useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
      <Input
        isDisabled={isDisabled || false}
        ref={ref as Ref<HTMLInputElement>}
        label={label}
        variant="bordered"
        placeholder={placeholder}
        labelPlacement="outside"
        color="secondary"
        size="lg"
        {...rest}
        classNames={{
          label: ["md:text-sm", "font-light", "text-sm", "font-poppins"],
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
