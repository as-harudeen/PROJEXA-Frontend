import { useEffect } from "react";
import { AuthErrorsInterface } from "../interfaces/Auth";
import { toast } from "react-toastify";

export const useAuthErrorLog = (errors: AuthErrorsInterface) => {
  useEffect(() => {
    if (errors.user_email) {
      toast.error("Please Enter valid Email.");
    }
    if (errors.user_name) {
      toast.error("Username should be more than 4 characters.");
    }

    if(errors.user_full_name) {
      toast.error("Full name should be more than 4 characters.")
    }

    if (errors.password) {
      toast.error("Password should be more than 5 character");
    }
    if (errors.confirm_password) {
      toast.error("Password not match");
    }
  }, [errors]);
};
