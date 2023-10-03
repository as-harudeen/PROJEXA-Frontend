import { FC } from "react";
import { ButtonProps } from "./props";

export const Button: FC<ButtonProps> = ({ text, isPrimary, icon, isDisabled }) => {
  return (
      <button
      disabled={isDisabled || false}
        className={`w-full rounded-full text-[14px] sm:text-[16px] sm:py-3 py-[9px] font-poppins sm:font-[400] disabled:opacity-50 ${
          isPrimary ? "bg-light_hash" : "border"
        }`}
      >
        {icon}
        {text}
      </button>
  );
};
