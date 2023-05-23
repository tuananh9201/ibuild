import Image from "next/image";
import { createRef, useEffect, useState, useRef } from "react";

import { IbuildButton, Modal } from "@/components/common";
import IBuildText from "@/images/iBuildText.png";
import { CloseIcon } from "@/images/icons/product_types/icon_wrapper";

interface FormInputOtpProps {
  isOpen: boolean;
  content: string;
  error: string;
  onSend: (otp: string) => void;
  onClose: Function;
}

const FormInputOtp = ({
  isOpen,
  content,
  onClose,
  error,
  onSend,
}: FormInputOtpProps) => {
  // ref
  const intervalId = useRef<any>();

  // state
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const [inputRefsArray] = useState(() =>
    Array.from({ length: 6 }, () => createRef<HTMLInputElement>())
  );
  const [timeRemaining, setTimeRemaining] = useState(1 * 60);
  const [errors, setErrors] = useState({
    buttonSubmit: "",
  });

  // function
  const onChangeOtp = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 1) {
      e.target.value = value[1];
    }
    const currentIndex = e.target.tabIndex;
    const nextIndex = currentIndex < 6 - 1 ? currentIndex + 1 : 0;
    const nextInput = inputRefsArray?.[nextIndex]?.current;
    if (!nextInput) return;
    nextInput?.focus();
    const x = inputRefsArray.map((ip) => ip.current?.value);
    const o = x.join("");
    setOtp(o);
  };

  const handleClickContinue = () => {
    onSend(otp);
  };

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalId.current);
          setErrors((prev) => ({
            ...prev,
            buttonSubmit: "Mã xác nhận hết hiệu lực",
          }));
          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);
    return () => clearInterval(intervalId.current);
  }, [timeRemaining]);

  useEffect(() => {
    if (!isOpen) {
      setErrors((prev) => ({
        ...prev,
        buttonSubmit: "",
      }));
      clearInterval(intervalId.current);
      return;
    }
    setTimeRemaining(10 * 60);
  }, [isOpen]);

  useEffect(() => {
    setErrors((prev) => ({
      ...prev,
      buttonSubmit: error,
    }));
  }, [error]);

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const bodyContent = (
    <div>
      <div
        className="flex justify-end mb-10 cursor-pointer"
        onClick={() => onClose()}
      >
        <CloseIcon className="fill-black" />
      </div>
      <Image src={IBuildText} alt="ibuild" className="mb-4" />
      <div className="flex flex-row justify-between mb-6">
        <span className="text-text-color font-medium text-[32px]">
          Nhập mã xác nhận
        </span>
        <span className="text-text-color font-medium text-xl">
          {minutes < 10 ? `0${minutes}` : minutes}:{" "}
          {seconds < 10 ? `0${seconds}` : seconds}
        </span>
      </div>
      <div className="mb-6">
        <p className="text-secondary-color text-base font-normal">
          Mã OTP đã được gửi đến {content}, để giữ an toàn cho tài khoản vui
          lòng không cung cấp mã OTP cho bất kì ai.
        </p>
      </div>
      <div className="mb-6">
        <p className="text-secondary-color text-base font-normal">
          Thời gian hiệu lực của mã OTP là 10 phút kể từ khi gửi đi.
        </p>
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
          disabled={otp.trim().length < 6 || isLoading || timeRemaining <= 0}
          prefix="Xác nhận"
          isLoading={isLoading}
        />
        {errors.buttonSubmit && (
          <div className="text-[#ff4d4f] mt-1 text-sm font-medium">
            {errors.buttonSubmit}
          </div>
        )}
      </div>
    </div>
  );

  return <>{isOpen && <Modal isOpen body={bodyContent} />}</>;
};

export default FormInputOtp;
