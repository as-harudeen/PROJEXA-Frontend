import { FC } from "react";
import { ButtonProps } from "./props";

export const Button: FC<ButtonProps> = ({ text, isPrimary, icon }) => {
  return (
      <button
        className={`w-full rounded-full text-[14px] sm:text-[16px] sm:py-3 py-[9px] font-poppins sm:font-[400] ${
          isPrimary ? "bg-light_hash" : "border"
        }`}
      >
        {icon}
        {text}
      </button>
  );
};
