import ChangePassSuccess from "@/components/common/forget/ChangePassSuccess";
import FormChangePass from "@/components/common/forget/FormChangePass";
import FormForgetPassword from "@/components/common/forget/FormForget";
import FormOtp from "@/components/common/forget/FormOtp";
import SendedEmailForgetPassword from "@/components/common/forget/SendedEmailForgetPassword";
import OnBoardLayout from "@/components/onboard-layout";
import { backIcon, logo, unsplashSignUp } from "@/constants/images";
import { passwordRecovery } from "lib/api/auth";
import { NextPageWithLayout } from "./_app";

import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactElement, useState, useEffect } from "react";

const ForgetPassword: NextPageWithLayout = () => {
  const [currentStep, setCurrentStep] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [emailUser, setEmailUser] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();
  const handleSendEmailSubmit = async (email: string) => {
    setEmailUser(email);
    setIsLoading(true);
    const res = await passwordRecovery(email);
    setIsLoading(false);
    if (res) {
      setCurrentStep(2);
      setIsSuccess(true);
    }
  };
  const onFailed = () => {};

  // confirm code
  const handleConfirmCodeSubmit = async (code: string) => {
    console.log(code);
  };

  const steps = [
    {
      step: 1,
      component: (
        <FormForgetPassword
          handleSendEmailSubmit={handleSendEmailSubmit}
          onFailed={onFailed}
          isLoading={isLoading}
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
          handleConfirmCodeSubmit={handleConfirmCodeSubmit}
          isLoading={isLoading}
        />
      ),
      title: "Mã xác nhận",
    },
    {
      step: 4,
      component: <FormChangePass />,
      title: "Nhập mã xác nhận",
    },
    {
      step: 5,
      component: <ChangePassSuccess />,
      title: "Đổi mật khẩu",
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

  if (!currentComponent) {
    return <div>FAIL</div>;
  }
  return (
    <>
      <Head>
        <title>Tìm lại mật khẩu</title>
      </Head>
      {currentStep !== 3 ? (
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
      ) : (
        <></>
      )}
      <div className="right-signin">
        <div
          className="right-signin-container"
          style={{ alignItems: currentStep === 3 ? "center" : "flex-start" }}
        >
          {currentStep !== 3 ? (
            <div className="right-signin-container-nav">
              <Link href="/">
                <Image src={backIcon} alt="" />
              </Link>
            </div>
          ) : (
            <></>
          )}
          <div
            className={`right-signin-container-content ${
              currentStep == 3 ? "confirm-code" : ""
            }`}
          >
            <div className="heading">
              <div
                className="logo"
                style={{ margin: currentStep === 3 ? "0 auto" : "auto" }}
              >
                <Image src={logo} alt="" />
              </div>
              <div
                className="welcome"
                style={{ textAlign: currentStep === 3 ? "center" : "left" }}
              >
                {currentTitle}
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
