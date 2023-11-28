// import { toast } from "react-toastify";
// import { RegisterFormInterface } from "../interfaces/Auth";
// import { isAxiosError } from "axios";
// import { getRequest, postRequest } from "./api.helper";
// import { API_POST_GENERATE_REGISTER_OTP } from "../constants/api.url";

// /**
//  * send request to backend and generate the register otp.
//  * @param data - Register details
//  * @returns
//  */
// export const generateRegisterOTP = async (data: RegisterFormInterface) => {
//   try {
//     await postRequest(API_POST_GENERATE_REGISTER_OTP, data);
//     toast.success("OTP sent successfully");
//     return true;
//   } catch (err) {
//     console.log(err);
//     let message = "OOPS Something went wrong";
//     if (isAxiosError(err)) {
//       if (err.response?.status === 400) {
//         message = err.response?.data.message || message;
//       }
//     }
//     toast.error(message);
//   }
//   return false;
// };

// /**
//  * send request to backend and Regenerate the
//  *  register otp.
//  */
// export const resendRegisterOTPHandler = async () => {
//   try {
//     await getRequest("/auth/regenerate/register-otp");
//     toast.success("OTP sended successfully");
//   } catch (err) {
//     let message = "OPPS Something went wrong";
//     if (isAxiosError(err)) {
//       if (err.response?.status == 400) {
//         message = err.response?.data.message || message;
//       } else if (err.response?.status === 401) {
//         message = "Plase enter your credential once more";
//       }
//     }
//     toast.error(message);
//   }
// };
