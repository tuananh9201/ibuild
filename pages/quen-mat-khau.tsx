import { ReactElement } from "react";
import MainLayout from "@/components/main-layout";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Form, Input } from "antd";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { backIcon, logo, unsplashSignUp } from "@/constants/images";
import Link from "next/link";
import { motion } from "framer-motion";
import SendedEmailForgetPassword from "@/components/common/forget/SendedEmailForgetPassword";
import FormForget from "@/components/common/forget/FormForget";
import FormForgetPassword from "@/components/common/forget/FormForget";
import FormOtp from "@/components/common/forget/FormOtp";
import FormChangePass from "@/components/common/forget/FormChangePass";
import ChangePassSuccess from "@/components/common/forget/ChangePassSuccess";

const ForgetPassword: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const onSuccess = () => {
    console.log("on Success !");
  };
  const onFailed = () => {};
  const steps = [
    {
      step: 1,
      component: (
        <FormForgetPassword onFailed={onFailed} onSuccess={onSuccess} />
      ),
    },
    {
      step: 2,
      component: <SendedEmailForgetPassword />,
    },
    {
      step: 3,
      component: <FormOtp />,
    },
    {
      step: 4,
      component: <FormChangePass />,
    },
    {
      step: 5,
      component: <ChangePassSuccess />,
    },
  ];
  const [isSuccess, setIsSuccess] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const currentComponent = steps.find((s) => s.step === currentStep)?.component;

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
              <div className="welcome">Tìm lại mật khẩu</div>
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
