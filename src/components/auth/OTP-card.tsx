import React, { FC, useState } from "react";
import styles from "../../style";
import { OTPInputContainer } from "./OTPInputContainer";
import { Button } from "../custom/Button";

interface OTPCardProps {
  closeHandler: React.Dispatch<React.SetStateAction<boolean>>;
  resendOTPFn?: () => Promise<void>;
  validateURL: string;
  isOpen: boolean;
}

export const OTPCard: FC<OTPCardProps> = ({
  closeHandler,
  resendOTPFn,
  validateURL,
  isOpen,
}) => {
  const [isLoading, setisLoading] = useState(false);

  const resendOTPHandler = async () => {
    setisLoading(true);
    if (resendOTPFn != null) await resendOTPFn();
    setisLoading(false);
  };

  return (
    <div
      className={`bg-light_hash h-[400px] top-[50%] sm:top-0 translate-y-[-50%] sm:translate-y-0 sm:h-[80%] sm:w-[80%] rounded-lg absolute sm:relative ${
        isOpen ? "scale-100" : "scale-0"
      } transition-transform duration-300`}
    >
      <div
        className={`h-full w-full ${styles.flexCenter} flex-col justify-evenly px-6`}
      >
        <div className="flex flex-col items-center">
          <h3 className="text-[20px] font-poppins font-semibold">
            Varify Email
          </h3>
          <p className="text-[15px]  font-[300]">
            Check your email and enter your one-time-password
          </p>
        </div>
        <OTPInputContainer fetchUrl={validateURL} />
        <div
          className={`${styles.flexCenter} flex-col font-poppins text-[15px] underline `}
        >
          {isLoading ? (
            <Button isLoading size="custom"></Button>
          ) : (
            <p className="cursor-pointer" onClick={resendOTPHandler}>
              resend
            </p>
          )}
          <p className="cursor-pointer" onClick={() => closeHandler(false)}>
            Change email
          </p>
        </div>
      </div>
    </div>
  );
};
