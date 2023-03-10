import React, { createRef, useEffect, useState } from "react";
import { IbuildButton } from "../common";
import { refresh } from "@/constants/images";
import Image from "next/image";
type Props = {
  phone?: string;
};
const numerOfInputs = 6;
const FormInputPhoneOPT = (props: Props) => {
  const [otp, setOtp] = useState("");
  const [inputRefsArray] = useState(() =>
    Array.from({ length: numerOfInputs }, () => createRef<HTMLInputElement>())
  );
  const [currentIndex, setCurrentIndex] = useState(0);
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
  const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    // e.target.value = "";
  };
  return (
    <div>
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
            onFocus={onFocus}
            ref={ref}
          />
        ))}
      </div>
      <div className="mt-6 w-full">
        <IbuildButton prefix="Tiếp tục" />
      </div>
      <div className="resend mt-4 flex justify-center w-full">
        <div className="text-primary-color font-medium text-base gap-1 flex justify-center items-center hover:cursor-pointer">
          <Image className="w-5 h-5" alt="refresh" src={refresh} />
          <span>Gửi lại mã xác nhận</span>
        </div>
      </div>
    </div>
  );
};

export default FormInputPhoneOPT;
