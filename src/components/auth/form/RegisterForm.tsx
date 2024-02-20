import React, { FC, useState } from "react";
import { useZodForm } from "@hooks/useZodForm";
import {
  AuthErrorsInterface,
  RegisterFormInterface,
} from "../../../interfaces/Auth";
import { registerSchema } from "../../../utils/zodValidator";
import { useAuthErrorLog } from "@hooks/useAuthErrorLog";
import { AuthInput } from "../input/AuthInput";
import { PasswordInput } from "../input/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/custom/Button";
import { registerFormStyles } from "../styles";
import { useAuthOTP } from "@hooks/useAuthOTP";

interface RegisterFormProps {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm: FC<RegisterFormProps> = ({setIsRegistered}) => {
  const [isLoading, setIsLoading] = useState(false);


  const { handleSubmit, register, errors } =
    useZodForm<RegisterFormInterface>(registerSchema);
  const { generateRegisterOTP} = useAuthOTP();  

  useAuthErrorLog(errors as AuthErrorsInterface);

  const registerFormSubmitHandler = async (data: RegisterFormInterface) => {
    setIsLoading(true);
    if (await generateRegisterOTP(data)) setIsRegistered(true);
    setIsLoading(false);
  };
  return (
    <form onSubmit={handleSubmit(registerFormSubmitHandler)}>
      <div className={`lex-1 flex md:gap-4 gap-2 flex-col`}>
        <AuthInput
          {...register("user_email")}
          label="Email*"
          placeholder="Enter your email"
        />
        <AuthInput
          {...register("user_name")}
          label="Username*"
          placeholder="Enter your username"
        />
        <AuthInput
          {...register("user_full_name")}
          label="Full Name*"
          placeholder="Enter your full name"
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
        <Button
          type="submit"
          isLoading={isLoading}
          color="transperant"
          className={`border ${registerFormStyles.button}`}
        >
          Sign up
        </Button>
        <Button color="light_hash" className={`${registerFormStyles.button}`}>
          <Link to="/auth/login">Login</Link>
        </Button>
      </div>
    </form>
  );
};
