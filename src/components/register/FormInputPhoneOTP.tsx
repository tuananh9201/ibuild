import React, { createRef, useState } from "react";
import { IbuildButton } from "../common";
import { useSelector } from "react-redux";
import { RootState } from "src/store/store";
import { useDispatch } from "react-redux";
import { changeStep, showResendButton } from "src/store/features/auth/register";
import { registerWithPhoneNumber, verifySMSOTP } from "src/lib/api/auth";
import { message } from "antd";
import { ERRORS } from "@/constants/msg";
type Props = {
  phone: string;
};
const numerOfInputs = 6;
const FormInputPhoneOTP = (props: Props) => {
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const registerState = useSelector((state: RootState) => state.register);
  const [inputRefsArray] = useState(() =>
    Array.from({ length: numerOfInputs }, () => createRef<HTMLInputElement>())
  );
  const handleClickResendOtp = async () => {
    const result = await registerWithPhoneNumber(props.phone);
    if (result) {
      const data = result.data.data;
      const { remain } = data;
      if (remain < 0) {
        dispatch(changeStep(4));
      } else {
        dispatch(changeStep(2));
      }
    }
    dispatch(showResendButton(false));
  };
  const onChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 1) {
      e.target.value = value[1];
    }
    const currentIndex = e.target.tabIndex;
    const nextIndex = currentIndex < numerOfInputs - 1 ? currentIndex + 1 : 0;
    const nextInput = inputRefsArray?.[nextIndex]?.current;
    if (!nextInput) return;
    nextInput?.focus();
    const x = inputRefsArray.map((ip) => ip.current?.value);
    const o = x.join("");
    setOtp(o);
  };
  const handleClickContinue = async () => {
    setLoading(true);
    const result = await verifySMSOTP({ phoneNumber: props.phone, otp: otp });
    if (!result) {
      setLoading(false);
      return;
    } else {
      dispatch(changeStep(3));
    }
    if (registerState.showResendButton) {
      message.error(ERRORS.MSG010);
    }
    setLoading(false);
  };
  return (
    <div className="">
      <div className="font-normal text-base">
        Mã OTP đã được gửi đến số điện thoại {props?.phone || "0123456789"}, để
        giữ an toàn cho tài khoản vui lòng không cung cấp mã OTP cho bất kì ai.
      </div>
      <div className="mt-3 font-normal text-base">
        Thời gian hiệu lực của mã OTP là 10 phút kể từ khi gửi đi.
      </div>
      <div className="mt-6 flex flex-row justify-between gap-6">
        {inputRefsArray.map((ref, idx) => (
          <input
            className="w-16 h-16 border border-solid border-[#999999] p-2 rounded-md font-semibold text-3xl text-center"
            tabIndex={idx}
            name={`opt${idx}`}
            onChange={onChangeOtp}
            type="number"
            ref={ref}
            key={idx}
          />
        ))}
      </div>
      <div className="mt-6 w-full">
        <IbuildButton
          onClick={handleClickContinue}
          disabled={otp.trim().length < 6 || loading}
          prefix="Tiếp tục"
          isLoading={loading}
        />
      </div>
      {registerState.showResendButton ? (
        <div className="resend mt-4 flex justify-center w-full">
          <div className="text-primary-color font-medium text-base ">
            <button
              onClick={handleClickResendOtp}
              className="flex justify-center items-center gap-1 disabled:bg-transparent disabled:text-[#999999]"
            >
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_768_126)">
                  <path
                    d="M15.2086 5.89046C13.8502 4.53212 11.9252 3.74879 9.80855 3.96546C6.75022 4.27379 4.23355 6.75712 3.89189 9.81546C3.43355 13.8571 6.55855 17.2655 10.5002 17.2655C13.1586 17.2655 15.4419 15.7071 16.5086 13.4655C16.7752 12.9071 16.3752 12.2655 15.7586 12.2655C15.4502 12.2655 15.1586 12.4321 15.0252 12.7071C14.0836 14.7321 11.8252 16.0155 9.35855 15.4655C7.50855 15.0571 6.01689 13.5488 5.62522 11.6988C4.92522 8.46546 7.38355 5.59879 10.5002 5.59879C11.8836 5.59879 13.1169 6.17379 14.0169 7.08212L12.7586 8.34046C12.2336 8.86546 12.6002 9.76546 13.3419 9.76546H16.3336C16.7919 9.76546 17.1669 9.39046 17.1669 8.93212V5.94046C17.1669 5.19879 16.2669 4.82379 15.7419 5.34879L15.2086 5.89046Z"
                    fill="#4F86FF"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_768_126">
                    <rect
                      width="20"
                      height="20"
                      fill="white"
                      transform="translate(0.5 0.599609)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <span>Gửi lại mã xác nhận</span>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default FormInputPhoneOTP;
