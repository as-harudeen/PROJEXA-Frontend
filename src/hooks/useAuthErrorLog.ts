import { useEffect } from "react";
import { AuthErrorsInterface } from "../interfaces/Auth";
import { toast } from "react-toastify";

export const useAuthErrorLog = (errors: AuthErrorsInterface) => {
  useEffect(() => {
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
  }, [errors]);
};
