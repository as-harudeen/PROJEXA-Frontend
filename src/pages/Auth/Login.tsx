import React, { FC, useEffect, useState } from "react";
import { Nav } from "../../components/Nav/Nav";
import styles from "../../style";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { Button } from "../../components/auth/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthInput } from "../../components/auth/AuthInput";
import { Link } from "react-router-dom";
import { LoginFromInitialState } from "../../common/initialState";
import { useForm } from "react-hook-form";
import { LoginFormInterface } from "../../interfaces/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";

export const Login: FC = () => {
  const [formData, setFormData] = useState(LoginFromInitialState);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormInterface>({ resolver: zodResolver(loginSchema) });

  useEffect(() => {
    if (errors.user_email?.message) {
      toast.error(errors.user_email.message);
    }
  }, [errors]);

  const FormSubmitHandler = (data: LoginFormInterface) => {};

  return (
    <>
      <Nav actived="login" />
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
                    <Link to="/register">
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
                <div className="bg-light_hash h-[80%] w-[80%] rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
