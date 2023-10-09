import { FC, useState } from "react";
import styles from "../../style";
import { PasswordInput } from "../../components/auth/input/PasswordInput";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthInput } from "../../components/auth/input/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import { AuthErrorsInterface, LoginFormInterface } from "../../interfaces/Auth";
import { loginSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";
import { useZodForm } from "../../hooks/useZodForm";
import { useAuthErrorLog } from "../../hooks/useAuthErrorLog";
import { isAxiosError } from "axios";
import { postRequest } from "../../helper/api.helper";
import { API_POST_LOGIN, API_POST_VALIDATE_2AF } from "../../constants/api.url";
import { OTPCard } from "../../components/auth/OTP-card";
import { Button } from "../../components/custom/Button";
import { useAppDispatch } from "@hooks/storeHooks";
import { toggleIsLoggedIn } from "@/store/slice/useSlice";

export const Login: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isOTPCardOpen, setIsOTPCardOpen] = useState(false);
  const { handleSubmit, register, errors } =
    useZodForm<LoginFormInterface>(loginSchema);
  useAuthErrorLog(errors as AuthErrorsInterface);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  console.log(isLoading);
  const FormSubmitHandler = async (data: LoginFormInterface) => {
    try {
      console.log("hello");
      setIsLoading(true);
      const res = await postRequest(API_POST_LOGIN, data);
      if (res.status === 200) {
        toast.success("Login success");
        dispatch(toggleIsLoggedIn(true));
        navigate("/personal/project");
      } else {
        toast.success("OTP sent successfully");
        setIsOTPCardOpen(true);
      }
    } catch (err) {
      let message = "OPPS Something wrong";

      if (isAxiosError(err)) {
        if (err.response?.status === 400) {
          message = "Incorrect email or password please try again";
        }
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`bg-primary w-full min-h-screen ${styles.flexCenter} py-16 md:py-40`}
      >
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
              <div
                className={`w-full px-10 max-w-[400px] ${
                  isOTPCardOpen ? "scale-0" : "scale-100"
                } transition-transform duration-300`}
              >
                <div className="md:mb-10 mb-5 w-full">
                  <h1 className="md:text-[34px] text-[24px] font-semibold font-poppins">
                    Login
                  </h1>
                  <p className="md:text-lg text-medium font-poppins text-gray-400">
                    Hello, welcome back.
                  </p>
                </div>
                <form onSubmit={handleSubmit(FormSubmitHandler)}>
                  <div
                    className={`flex-1 flex md:gap-4 gap-2 flex-col
                  `}
                  >
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
                    <Button
                      type="submit"
                      isLoading={isLoading}
                      className="bg-light_hash rounded-3xl"
                    >
                      Login
                    </Button>
                    <Link className="w-full" to="/auth/register">
                      <Button
                        size="custom"
                        color="transperant"
                        className="w-full rounded-3xl"
                      >
                        Sign up
                      </Button>
                    </Link>
                  </div>
                </form>
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
                  closeHandler={setIsOTPCardOpen}
                  isOpen={isOTPCardOpen}
                  validateURL={API_POST_VALIDATE_2AF}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
