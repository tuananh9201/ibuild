import ChangePassFailed from "@/components/common/forget/ChangePassFailed";
import ChangePassSuccess from "@/components/common/forget/ChangePassSuccess";
import FormChangePass from "@/components/common/forget/FormChangePass";
import FormForgetPassword from "@/components/common/forget/FormForget";
import FormOtp from "@/components/common/forget/FormOtp";
import SendedEmailForgetPassword from "@/components/common/forget/SendedEmailForgetPassword";
import OnBoardLayout from "@/components/onboard-layout";
import { backIcon, logo, unsplashSignUp } from "@/constants/images";
import {
  loginApi,
  passwordRecovery,
  verifyPasswordRecoveryCode,
} from "src/lib/api/auth";
import { NextPageWithLayout } from "./_app";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "src/lib/api/api";
import { login } from "src/store/features/auth/auth";

const ForgetPassword: NextPageWithLayout = () => {
  // state
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [blockExpire, setBlockExpire] = useState(86400);
  const [isShowResendCodeBtn, setIsShowResendCodeBtn] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const dispatch = useDispatch();

  // methods
  const handleSendEmailSubmit = async (email: string) => {
    setEmailUser(email);
    setIsLoading(true);
    const res = await passwordRecovery(email);
    setIsLoading(false);
    if (res.status) {
      setCurrentStep(2);
      setIsSuccess(true);
    }
    if (res?.expires) {
      setBlockExpire(parseInt(res.expires.toString()));
      setCurrentStep(6);
    }
  };

  const handleResendCode = async (email: string) => {
    setIsLoading(true);
    const res = await passwordRecovery(email);
    if (res?.expires) {
      setBlockExpire(parseInt(res.expires.toString()));
      setCurrentStep(6);
    }
    setTimeRemaining(10 * 60);
    setIsLoading(false);
    setIsShowResendCodeBtn(false);
  };
  const onChangePassSuccess = (cred: { email: string; password: string }) => {
    setCurrentStep(5);
    setNewPassword(cred.password);
  };

  const onFailed = () => {};

  const handleConfirmCodeSubmit = async (code: string) => {
    setIsLoading(true);
    const res = await verifyPasswordRecoveryCode({ code, email: emailUser });
    setIsLoading(false);
    if (res) {
      setOtpCode(code);
      setCurrentStep(4);
    }
  };
  const doLogin = async (cred: { email: string; password: string }) => {
    const data = await loginApi(cred);
    const access_token = data?.access_token;
    if (access_token) {
      setToken(access_token);
      dispatch(login(access_token));
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
      component: (
        <FormChangePass
          email={emailUser}
          code={otpCode}
          onSuccess={onChangePassSuccess}
        />
      ),
      title: "Đổi mật khẩu",
    },
    {
      step: 5,
      component: <ChangePassSuccess />,
      title: "Đổi mật khẩu thành công",
    },
    {
      step: 6,
      component: <ChangePassFailed expires={blockExpire} />,
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
    const t = setTimeout(() => {
      if (currentStep === 5) {
        doLogin({ email: emailUser, password: newPassword });
      }
    }, 5000);

    return () => {
      clearTimeout(t);
    };
  }, [currentStep]);
  useEffect(() => {
    if (currentStep === 3) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            setIsShowResendCodeBtn(true);
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [currentStep, timeRemaining]);

  if (!currentComponent) {
    return <div>FAIL</div>;
  }
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return (
    <>
      <Head>
        <title>Tìm lại mật khẩu</title>
      </Head>
      <div className="hidden lg:block w-full h-full flex-1">
        <Image
          className="w-full h-full"
          priority={true}
          src={unsplashSignUp}
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1">
        <div className="mx-0 my-[60px] lg:mt-[80px] lg:mx-10 lg:mb-auto">
          <div className="flex justify-start px-[10px] py-[21px] cursor-pointer">
            <Link href="/">
              <Image src={backIcon} alt="" />
            </Link>
          </div>
          <div className="mx-5 my-12 lg:mx-[60px] lg:my-20">
            <div>
              <div className="flex justify-center items-center max-w-[120px] max-h-[30px]">
                <Image src={logo} alt="" />
              </div>
              <div className="mt-4 mb-8 text-[32px] flex justify-between items-baseline">
                <span>{currentTitle}</span>
                {currentStep === 3 ? (
                  <span className="text-xl font-medium">
                    {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </span>
                ) : (
                  <></>
                )}
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
