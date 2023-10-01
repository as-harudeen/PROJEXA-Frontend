import { FC } from "react";
import { ButtonProps } from "./props";

export const Button: FC<ButtonProps> = ({ isLoginButton, styles }) => {
  return (
    <button
      className={`text-secondary text-[10px] font-medium md:text-[14px] border-2 border-secondary px-5 py-[2px] rounded-full hover:opacity-60 ${styles ? styles: ""}`}
    >
      {isLoginButton ? "Login" : "Register "}
    </button>
  );
};
