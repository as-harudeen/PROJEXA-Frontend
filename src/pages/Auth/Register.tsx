import { FC } from "react";
import styles from "../../style";
import { Button } from "../../components/auth/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";
import { OTPInputContainer } from "../../components/auth/OTPInputContainer";
import { resendRegisterOTPHandler } from "../../helper/auth.helper";
import { useAuthContext } from "../../context/useAuthContext";
import { RegisterForm } from "../../components/auth/RegisterForm";
import { useAppDispatch } from "../../hooks/storeHooks";
import { offLoading, onLoading } from "../../store/slice/loadingSlice";

export const Register: FC = () => {
  const { isOTPFormViewble, setIsOTPFormViewble } = useAuthContext();
  const dispatch = useAppDispatch();

  const resendOTPHandler = () => {
    dispatch(onLoading());
    resendRegisterOTPHandler();
    dispatch(offLoading());
  }
  return (
    <>
      <div className={`bg-primary w-full ${styles.flexCenter} py-16 md:py-40 `}>
        <div
          className={` min-h-[600px] ${styles.boxWidth} ${styles.flexCenter}`}
        >
          <div
            className={`bg-dark_hash sm:w-[1000px] w-[500px] text-white md:py-24 py-14 flex flex-col sm:flex-row rounded-xl`}
          >
            <div
              className={`flex-1 w-full flex justify-center items-center flex-col`}
            >
              <div className="w-full px-10 max-w-[400px]">
                <div className="md:mb-10 mb-5 w-full">
                  <h1 className="md:text-[34px] text-[24px] font-semibold font-poppins">
                    Sign up
                  </h1>
                  <p className="md:text-lg text-medium font-poppins text-gray-400">
                    Hi, Join with us.
                  </p>
                </div>
                <RegisterForm />

                <div className="flex justify-center md:my-10 my-4">
                  <p>or</p>
                </div>
                <div>
                  <Button
                    isDisabled={isOTPFormViewble}
                    icon={<GoogleIcon fontSize="small" className="mr-2" />}
                    isPrimary={true}
                    text="Sign up with google"
                  />
                </div>
              </div>
            </div>
            <div className={`flex-1 ${styles.flexCenter}`}>
              <div
                className={`bg-hash_one h-[100%] w-[100%] rounded-l-xl flex-1 ${styles.flexCenter}`}
              >
                <div className="bg-light_hash h-[400px] top-[50%] sm:top-0 translate-y-[-50%] sm:translate-y-0 sm:h-[80%] sm:w-[80%] rounded-lg absolute sm:relative">
                  <div
                    className={`h-full w-full ${
                      styles.flexCenter
                    } flex-col justify-evenly px-6 ${
                      !isOTPFormViewble ? "hidden" : ""
                    }`}
                  >
                    <div className="flex flex-col items-center">
                      <h3 className="text-[20px] font-poppins font-semibold">
                        Varify Email
                      </h3>
                      <p className="text-[15px]  font-[300]">
                        Check your email and enter your one-time-password
                      </p>
                    </div>
                    <OTPInputContainer fetchUrl="/auth/validate/register-otp"/>
                    <div
                      className={`${styles.flexCenter} flex-col font-poppins text-[15px] underline `}
                    >
                      <p
                        className="cursor-pointer"
                        onClick={resendOTPHandler}
                      >
                        resend
                      </p>
                      <p
                        className="cursor-pointer"
                        onClick={() => setIsOTPFormViewble(false)}
                      >
                        Change email
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
