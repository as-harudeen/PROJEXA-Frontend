import { FC, useState } from "react";
import styles from "../../style";
import { RegisterForm } from "../../components/auth/form/RegisterForm";
import { OTPCard } from "../../components/auth/OTP-card";
import { API_POST_VALIDATE_REGISTER_OTP } from "../../constants/api.url";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useFetch } from "@hooks/useFetch";
import { useAuthOTP } from "@hooks/useAuthOTP";

export const Register: FC = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegisterd] = useState(false);
  const { postRequest } = useFetch();
  const { resendRegisterOTPHandler } = useAuthOTP();

  const OTPValidateFunction = async (otp: string) => {
    const response = await postRequest(API_POST_VALIDATE_REGISTER_OTP, {
      otp,
    });

    if (response.ok) {
      navigate("/auth/login");
      toast.success("OTP Verified");
    } else {
      let message = "OPPS Something went wrong";
      if (response.status == 400) {
        message = (await response.text()) || message;
      } else if (response.status === 401) {
        message = "Plase enter your credential once more";
      }
      toast.error(message);
    }
  };
  return (
    <>
      <div
        className={`bg-light_mode_secondary dark:bg-hash_two min-h-screen w-full ${styles.flexCenter} py-16 `}
      >
        <div
          className={` min-h-[600px] ${styles.boxWidth} ${styles.flexCenter}`}
        >


      {/* <div className="absolute bg-gray-500 rounded-full w-[50%] h-[50%] -left-[35%] opacity-20  top-32 filter blur-2xl "></div> */}

          <div
            className={`bg-light_mode_primar dark:bg-hash_dark_two/40 backdrop-blur-xl sm:w-[1000px] w-[500px] dark:text-white md:py-24 py-14 flex flex-col sm:flex-row rounded-xl ring-1 ring-hash_one shadow-2xl shadow-slate-700`}
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
                  <p className="md:text-lg text-medium font-poppins text-gray-600 dark:text-gray-400">
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
                className={`bg-light_mode_hard dark:bg-hash_one/40 backdrop-blur-xl h-[100%] w-[100%] rounded-l-xl flex-1 ${styles.flexCenter}`}
              >
                <OTPCard
                  isOpen={isRegistered}
                  closeHandler={setIsRegisterd}
                  resendOTPFn={resendRegisterOTPHandler}
                  validateFn={OTPValidateFunction}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
