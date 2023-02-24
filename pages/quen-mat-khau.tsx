import ChangePassSuccess from "@/components/common/forget/ChangePassSuccess";
import FormChangePass from "@/components/common/forget/FormChangePass";
import FormForgetPassword from "@/components/common/forget/FormForget";
import FormOtp from "@/components/common/forget/FormOtp";
import SendedEmailForgetPassword from "@/components/common/forget/SendedEmailForgetPassword";
import ChangePassFailed from "@/components/common/forget/ChangePassFailed";
import OnBoardLayout from "@/components/onboard-layout";
import { backIcon, logo, unsplashSignUp } from "@/constants/images";
import { passwordRecovery, verifyPasswordRecoveryCode } from "lib/api/auth";
import { NextPageWithLayout } from "./_app";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState, useEffect } from "react";

const ForgetPassword: NextPageWithLayout = () => {
  // state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [timer, setTimer] = useState("10:00");
  const [isShowResendCodeBtn, setIsShowResendCodeBtn] = useState(false);

  // custom hook
  const router = useRouter();

  // methods
  const handleSendEmailSubmit = async (email: string) => {
    console.log(email);
    setEmailUser(email);
    setIsLoading(true);
    const res = await passwordRecovery(email);
    setIsLoading(false);
    if (res) {
      setCurrentStep(2);
      setIsSuccess(true);
    }
  };

  const handleResendCode = async (email: string) => {
    setIsLoading(true);
    await passwordRecovery(email);
    setIsLoading(false);
  };

  const onFailed = () => {};

  const handleConfirmCodeSubmit = async (code: string) => {
    setIsLoading(true);
    const res = await verifyPasswordRecoveryCode({ code, email: emailUser });
    setIsLoading(false);
    if (res) {
      setCurrentStep(4);
    } else {
      setCurrentStep(6);
    }
  };

  const steps = [
    {
      step: 1,
      component: (
        <FormForgetPassword
          isLoading={isLoading}
          handleSendEmailSubmit={handleSendEmailSubmit}
          onFailed={onFailed}
        />
      ),
      title: "Tìm lại mật khẩu",
    },
    {
      step: 2,
      component: <SendedEmailForgetPassword email={emailUser} />,
      title: "Gửi mã xác nhận thành công",
    },
    {
      step: 3,
      component: (
        <FormOtp
          isLoading={isLoading}
          email={emailUser}
          isShowResendCodeBtn={isShowResendCodeBtn}
          handleConfirmCodeSubmit={handleConfirmCodeSubmit}
          handleResendCode={handleResendCode}
        />
      ),
      title: "Nhập mã xác nhận",
    },
    {
      step: 4,
      component: <FormChangePass isLoading={isLoading} />,
      title: "Đổi mật khẩu",
    },
    {
      step: 5,
      component: <ChangePassSuccess />,
      title: "Đổi mật khẩu thành công",
    },
    {
      step: 6,
      component: <ChangePassFailed />,
      title: "Số lần xác thực đã quá giới hạn",
    },
  ];

  const current = steps.find((s) => s.step === currentStep);
  const currentComponent = current?.component;
  const currentTitle = current?.title || "";

  useEffect(() => {
    const delay = setTimeout(() => {
      if (isSuccess) {
        setCurrentStep(3);
      }
    }, 5000);

    return () => clearTimeout(delay);
  }, [isSuccess]);

  useEffect(() => {
    if (currentStep !== 3) return;

    let duration = 30;
    let minutes: number;
    let seconds: number;
    let minutesTime: string;
    let secondsTime: string;
    let interval = setInterval(() => {
      minutes = Number.parseInt((duration / 60).toString(), 10);
      seconds = Number.parseInt((duration % 60).toString(), 10);

      minutesTime = minutes < 10 ? `0${minutes}` : `${minutes}`;
      secondsTime = seconds < 10 ? `0${seconds}` : `${seconds}`;

      setTimer(`${minutesTime}:${secondsTime}`);
      duration--;

      if (duration < 0) {
        clearInterval(interval);
        setIsShowResendCodeBtn(true);
      }

      return () => clearInterval(interval);
    }, 1000);
  }, [currentStep]);

  if (!currentComponent) {
    return <div>FAIL</div>;
  }
  return (
    <>
      <Head>
        <title>Tìm lại mật khẩu</title>
      </Head>
      <div className="left-signup">
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          priority={true}
          src={unsplashSignUp}
          alt=""
        />
      </div>
      <div className="right-signin">
        <div className="right-signin-container">
          <div className="right-signin-container-nav">
            <Link href="/">
              <Image src={backIcon} alt="" />
            </Link>
          </div>
          <div className="right-signin-container-content">
            <div className="heading">
              <div className="logo">
                <Image src={logo} alt="" />
              </div>
              <div className="welcome">
                <span>{currentTitle}</span>
                {currentStep === 3 ? <span>{timer}</span> : <></>}
              </div>
            </div>
            <motion.div
              animate={{ opacity: 1 }}
              initial={{ opacity: 0.5 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              {currentComponent}
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};
ForgetPassword.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OnBoardLayout>{page}</OnBoardLayout>
    </>
  );
};
export default ForgetPassword;
