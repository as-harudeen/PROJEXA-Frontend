import { FC } from "react";
import styles from "../../style";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { Button } from "../../components/auth/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthInput } from "../../components/auth/AuthInput";
import { Link } from "react-router-dom";
import { AuthErrorsInterface, LoginFormInterface } from "../../interfaces/Auth";
import { loginSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";
import { useZodForm } from "../../hooks/useZodForm";
import { useAuthErrorLog } from "../../hooks/useAuthErrorLog";
import { axiosInstance } from "../../common/api";
import { isAxiosError } from "axios";
import { useAuthContext } from "../../context/useAuthContext";
import { OTPInputContainer } from "../../components/auth/OTPInputContainer";

export const Login: FC = () => {
  const { isOTPFormViewble, setIsOTPFormViewble } = useAuthContext();
  const { handleSubmit, register, errors } =
    useZodForm<LoginFormInterface>(loginSchema);
  useAuthErrorLog(errors as AuthErrorsInterface);

  const FormSubmitHandler = async (data: LoginFormInterface) => {
    try {
      const res = await axiosInstance.post("/auth/login", data);
      console.log(res.status);
      if (res.status === 200) {
        toast.success("Login success");
      } else {
        toast.success("OTP sent successfully");
        setIsOTPFormViewble(true);
      }
    } catch (err) {
      let message = "OPPS Something wrong";

      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          message = "Incorrect email or password please try again";
        }
      }
      toast.error(message);
    }
  };

  return (
    <>
      <div className={`bg-primary w-full ${styles.flexCenter} py-16 md:py-40`}>
        <div
          className={` min-h-[600px] ${styles.boxWidth} ${styles.flexCenter}`}
        >
          placeholder
          <div
            className={`bg-dark_hash sm:w-[1000px] w-[500px] text-white md:py-24 py-14 flex flex-col sm:flex-row rounded-xl`}
          >
            <div
              className={`flex-1 w-full flex justify-center items-center flex-col`}
            >
              <div className="w-full px-10 max-w-[400px]">
                <div className="md:mb-10 mb-5 w-full">
                  <h1 className="md:text-[34px] text-[24px] font-semibold font-poppins">
                    Login
                  </h1>
                  <p className="md:text-lg text-medium font-poppins text-gray-400">
                    Hello, welcome back.
                  </p>
                </div>
                <form onSubmit={handleSubmit(FormSubmitHandler)}>
                  <div className="flex-1 flex md:gap-4 gap-2 flex-col font-">
                    <AuthInput
                      {...register("user_email")}
                      label="Email*"
                      placeholder="Enter your email"
                    />
                    <PasswordInput
                      label="Password"
                      placeholder="Enter your Password"
                      {...register("password")}
                    />
                  </div>
                  <div className="flex flex-col gap-2 my-6 md:my-12">
                    <Button isPrimary={true} text="Login" />
                    <Link to="/auth/register">
                      <Button isPrimary={false} text="Sign up" />
                    </Link>
                  </div>
                </form>
                <div className="flex justify-center md:my-10 my-4">
                  <p>or</p>
                </div>
                <div>
                  <Button
                    icon={<GoogleIcon fontSize="small" className="mr-2" />}
                    isPrimary={true}
                    text="Sign in with google"
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
                        2-Factor Auth
                      </h3>
                      <p className="text-[15px]  font-[300]">
                        Check your email and enter your one-time-password
                      </p>
                    </div>
                    <OTPInputContainer fetchUrl="/auth/validate/2AF-otp" />
                    <div
                      className={`${styles.flexCenter} flex-col font-poppins text-[15px] underline `}
                    ></div>
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
