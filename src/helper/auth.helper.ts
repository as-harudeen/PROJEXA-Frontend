import { toast } from "react-toastify";
import { axiosInstance } from "../common/api";
import { RegisterFormInterface } from "../interfaces/Auth";
import { isAxiosError } from "axios";


/**
 * send request to backend and generate the register otp.
 * @param data - Register details
 * @returns 
 */
export const generateRegisterOTP = async (
  data: RegisterFormInterface
) => {
  try {
    await axiosInstance.post("/otp/generate/register-otp", data);
    toast.success("OTP Sended successfully");
    return true;
  } catch (err) {
    let message = "OOPS Something went wrong";
    if (isAxiosError(err)) {
      if (err.response?.status === 400) {
        message = err.response?.data.message || message;
      }
    }
    toast.error(message);
  }
  return false;
};



/**
 * send request to backend and Regenerate the
 *  register otp.
 */
export const resendRegisterOTPHandler = async () => {
    try {
      await axiosInstance.get("/otp/regenerate/register-otp");
      toast.success("OTP sended successfully");
    } catch (err) {
      let message = "OPPS Something went wrong";
      if (isAxiosError(err)) {
        if (err.response?.status == 400) {
          message = err.response?.data.message || message;
        } else if (err.response?.status === 401) {
          message = "Plase enter your credential once more";
        }
      }
      toast.error(message);
    }
  };
