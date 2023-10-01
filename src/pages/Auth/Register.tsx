import { FC, useEffect } from "react";
import { Nav } from "../../components/Nav/Nav";
import styles from "../../style";
import { PasswordInput } from "../../components/auth/PasswordInput";
import { Button } from "../../components/auth/AuthButton";
import GoogleIcon from "@mui/icons-material/Google";
import { AuthInput } from "../../components/auth/AuthInput";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { RegisterFormInterface } from "../../interfaces/Auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../../utils/zodValidator";
import { toast } from "react-toastify";

export const Register: FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterFormInterface>({ resolver: zodResolver(registerSchema) });
  useEffect(() => {
    console.log(errors);
    if (errors.user_email?.message) {
      toast.error("Please Enter valid Email.");
    }
    if (errors.user_name) {
      toast.error("Username should be more than 4 character.");
    }

    if (errors.password) {
      toast.error("Password should be more than 5 character");
    }
    if (errors.confirm_password) {
      toast.error("Password not match");
    }
  });

  const formSubmitHandler = (data: RegisterFormInterface) => {};

  return (
    <>
      <Nav actived="login" />
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
                <form onSubmit={handleSubmit(formSubmitHandler)}>
                  <div className="flex-1 flex md:gap-4 gap-2 flex-col font-">
                    <AuthInput
                      {...register("user_name")}
                      label="Email*"
                      placeholder="Enter your email"
                    />
                    <AuthInput
                      {...register("user_email")}
                      label="Username*"
                      placeholder="Enter your username"
                    />
                    <PasswordInput
                      {...register("password")}
                      label="Password*"
                      placeholder="Enter your Password"
                    />
                    <PasswordInput
                      {...register("confirm_password")}
                      label="Confirm-Password*"
                      placeholder="Enter your Password once more"
                    />
                  </div>
                  <div className="flex flex-col gap-2 my-6 md:my-12">
                    <Button isPrimary={true} text="Sign up" />
                    <Link to="/login">
                      <Button isPrimary={false} text="Login" />
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
                    text="Sign up with google"
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
