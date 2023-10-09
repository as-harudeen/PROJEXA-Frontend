import { FC, useState } from "react";
import styles from "../../style";
import { resendRegisterOTPHandler } from "../../helper/auth.helper";
import { RegisterForm } from "../../components/auth/form/RegisterForm";
import { OTPCard } from "../../components/auth/OTP-card";
import { API_POST_VALIDATE_REGISTER_OTP } from "../../constants/api.url";

export const Register: FC = () => {
  const [isRegistered, setIsRegisterd] = useState(false);

  return (
    <>
      <div
        className={`bg-primary min-h-screen w-full ${styles.flexCenter} py-16 `}
      >
        <div
          className={` min-h-[600px] ${styles.boxWidth} ${styles.flexCenter}`}
        >
          <div
            className={`bg-dark_hash sm:w-[1000px] w-[500px] text-white md:py-24 py-14 flex flex-col sm:flex-row rounded-xl`}
          >
            <div
              className={`flex-1 w-full flex justify-center items-center flex-col`}
            >
              <div
                className={`w-full px-10 max-w-[400px] ${
                  isRegistered ? "scale-0" : "scale-100"
                } transition-transform duration-300 ease-in-out`}
              >
                <div className="md:mb-10 mb-5 w-full">
                  <h1 className="md:text-[34px] text-[24px] font-semibold font-poppins">
                    Sign up
                  </h1>
                  <p className="md:text-lg text-medium font-poppins text-gray-400">
                    Hi, Join with us.
                  </p>
                </div>
                <RegisterForm setIsRegistered={setIsRegisterd} />

                <div className="flex justify-center md:my-10 my-4">
                  <p>or</p>
                </div>
                <div>{/**google */}</div>
              </div>
            </div>
            <div className={`flex-1 ${styles.flexCenter}`}>
              <div
                className={`bg-hash_one h-[100%] w-[100%] rounded-l-xl flex-1 ${styles.flexCenter}`}
              >
                <OTPCard
                  isOpen={isRegistered}
                  closeHandler={setIsRegisterd}
                  resendOTPFn={resendRegisterOTPHandler}
                  validateURL={API_POST_VALIDATE_REGISTER_OTP}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
