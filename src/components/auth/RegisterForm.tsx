import { FC } from "react";
import { useZodForm } from "../../hooks/useZodForm";
import {
  AuthErrorsInterface,
  RegisterFormInterface,
} from "../../interfaces/Auth";
import { registerSchema } from "../../utils/zodValidator";
import { useAuthErrorLog } from "../../hooks/useAuthErrorLog";
import { AuthInput } from "./AuthInput";
import { PasswordInput } from "./PasswordInput";
import { Button } from "./AuthButton";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../context/useAuthContext";
import { generateRegisterOTP } from "../../helper/auth.helper";
import { useAppDispatch } from "../../hooks/storeHooks";
import { onLoading, offLoading } from "../../store/slice/loadingSlice";

export const RegisterForm: FC = () => {
  const dispatch = useAppDispatch();
  const { isOTPFormViewble, setIsOTPFormViewble } = useAuthContext();
  const { handleSubmit, register, errors } =
    useZodForm<RegisterFormInterface>(registerSchema);

  useAuthErrorLog(errors as AuthErrorsInterface);

  const registerFormSubmitHandler = async (data: RegisterFormInterface) => {
    dispatch(onLoading());
    if (await generateRegisterOTP(data)) setIsOTPFormViewble(true);
    dispatch(offLoading());
  };
  return (
    <form onSubmit={handleSubmit(registerFormSubmitHandler)}>
      <div className="flex-1 flex md:gap-4 gap-2 flex-col font-">
        <AuthInput
          isDisabled={isOTPFormViewble}
          {...register("user_email")}
          label="Email*"
          placeholder="Enter your email"
        />
        <AuthInput
          isDisabled={isOTPFormViewble}
          {...register("user_name")}
          label="Username*"
          placeholder="Enter your username"
        />
        <PasswordInput
          isDisabled={isOTPFormViewble}
          {...register("password")}
          label="Password*"
          placeholder="Enter your Password"
        />
        <PasswordInput
          isDisabled={isOTPFormViewble}
          {...register("confirm_password")}
          label="Confirm-Password*"
          placeholder="Enter your Password once more"
        />
      </div>
      <div className="flex flex-col gap-2 my-6 md:my-12">
        <Button isDisabled={isOTPFormViewble} isPrimary={true} text="Sign up" />
        <Link to={`${!isOTPFormViewble ? "/auth/login" : ""}`}>
          <Button
            isDisabled={isOTPFormViewble}
            isPrimary={false}
            text="Login"
          />
        </Link>
      </div>
    </form>
  );
};
