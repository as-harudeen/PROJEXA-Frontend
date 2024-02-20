import { RegisterFormInterface } from "@/interfaces/Auth";
import { useFetch } from "./useFetch";
import { API_POST_GENERATE_REGISTER_OTP } from "@/constants/api.url";
import { toast } from "react-toastify";

export const useAuthOTP = () => {
  const { postRequest } = useFetch();

  const generateRegisterOTP = async (data: RegisterFormInterface) => {
    console.log('generate register opt');
    const res = await postRequest(API_POST_GENERATE_REGISTER_OTP, data);
    console.log(res.status);
    if (res.ok) {
      toast.success("OTP sent successfully");
      // toast.success("Register successfully");
      return true;
    } else {
      let message = "OOPS Something went wrong";
      if (res.status === 400) {
        message = ((await res.json()).message) || message;
        console.log(message);
      }
      toast.error(message);
    }

    return false;
  };

  const resendRegisterOTPHandler = async () => {
    const res = await fetch(
      import.meta.env.VITE_BASE_URL + "auth/regenerate/register-otp",
      {
        method: "GET",
        credentials: "include",
      }
    );
    if (res.ok) {
      // toast.success("OTP sended successfully");
      toast.success("Register successfully");
    } else {
      let message = "OPPS Something went wrong";

      if (res.status == 400) {
        message = await res.json() || message;
      } else if (res.status === 401) {
        message = "Plase enter your credential once more";
      }
      toast.error(message);
    }
  };

  return {
    generateRegisterOTP,
    resendRegisterOTPHandler
  }
};
