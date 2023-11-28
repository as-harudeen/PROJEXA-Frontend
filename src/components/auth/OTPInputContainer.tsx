import { FC, useEffect, useRef, useState } from "react";

interface OTPInputContainerProps {
  validateFn: (otp: string) => Promise<void>;
}

let currOTPIdx = 0;
export const OTPInputContainer: FC<OTPInputContainerProps> = ({
  validateFn,
}) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIdx, setActiveOtpIdx] = useState(0);
  const otpInput = useRef<HTMLInputElement>(null);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    const newOTP = [...otp];
    newOTP[currOTPIdx] = value.substring(value.length - 1);
    if (value === "") {
      setActiveOtpIdx(currOTPIdx - 1);
    } else {
      setActiveOtpIdx(currOTPIdx + 1);
    }
    setOtp(newOTP);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    currOTPIdx = idx;
    if (key === "Backspace") {
      setActiveOtpIdx(currOTPIdx - 1);
    }
  };

  // const validateOTP = async () => {
  //   try {
  //     await postRequest(fetchUrl, {
  //       otp: otp.join(""),
  //     });
  //     if(pathname === "/auth/register")
  //        navigate('/auth/login')
  //     toast.success("OTP Verified");
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
  //   } finally {
  //     setOtp(new Array(6).fill(""));
  //     setActiveOtpIdx(0);
  //   }
  // };

  const validateOTP = async () => {
    await validateFn(otp.join(""));
    setOtp(new Array(6).fill(""));
    setActiveOtpIdx(0);
  };

  useEffect(() => {
    otpInput.current?.focus();
    if (activeOtpIdx === 6) validateOTP();
  }, [activeOtpIdx]);

  return (
    <div className="flex gap-2 h-10">
      {otp.map((_, idx) => (
        <input
          key={idx}
          onChange={handleOnChange}
          onKeyDown={(e) => handleOnKeyDown(e, idx)}
          ref={activeOtpIdx === idx ? otpInput : null}
          onClick={() => otpInput.current?.focus()}
          className="bg-transparent border-2 border-white border-opacity-50 rounded-md px-[14px] w-[42px] focus:outline-none focus:border-opacity-100"
          type="number"
          value={otp[idx]}
        />
      ))}
    </div>
  );
};
