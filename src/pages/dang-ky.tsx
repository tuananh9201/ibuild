import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import {
  backIcon,
  logo,
  signUpSuccess,
  unsplashSignUp2,
} from "@/constants/images";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import FormRegisterWithEmail from "@/components/register/FormRegisterWithEmail";
import FormRegisterWithPhone from "@/components/register/FormRegisterWithPhone";
import { RootState } from "src/store/store";
import { showResendButton } from "src/store/features/auth/register";

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState("phone");
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const registerState = useSelector((state: RootState) => state.register);

  const tabs = [
    {
      name: "phone",
      component: <FormRegisterWithPhone />,
      displayName: "Số điện thoại",
    },
    {
      name: "email",
      component: <FormRegisterWithEmail onSuccess={() => {}} />,
      displayName: "Email",
    },
  ];
  useEffect(() => {
    const tabInUrl = router.asPath.split("#");
    if (tabInUrl.length === 2) {
      const tabStr = tabInUrl[1];
      const tab = tabs.find((t) => t.name === tabStr);
      tab && setTabActive(tab.name);
    }
  }, [router]);
  useEffect(() => {
    if (
      registerState.currentStep.step === 2 &&
      !registerState.showResendButton
    ) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime === 0) {
            clearInterval(intervalId);
            dispatch(showResendButton(true));
            return 0;
          } else {
            return prevTime - 1;
          }
        });
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [registerState, timeRemaining, dispatch]);
  useEffect(() => {
    if (!registerState.showResendButton) {
      setTimeRemaining(30);
    }
  }, [registerState.showResendButton]);

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="w-full h-full flex-1 hidden lg:block">
        <Image
          className="w-full h-full"
          priority
          placeholder="blur"
          src={unsplashSignUp2}
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1">
        <div className="flex flex-col justify-start mt-20 mr-10 mb-auto ml-10 min-h-[300px]">
          <div className="flex flex-row justify-start px-5 py-2 ">
            {registerState.currentStep.step === 1 ? null : (
              <Link href="/">
                <Image src={backIcon} alt="" />
              </Link>
            )}
          </div>
          <div className="mx-20 my-14">
            <div>
              <div className="flex justify-center items-center max-w-[120px] max-h-[30px]">
                <Image src={logo} alt="" />
              </div>
              <div className="mt-4 mb-8 text-3xl flex justify-between items-baseline">
                {registerState.currentStep.title}
                {registerState.currentStep.step === 2 ? (
                  <div className="count-down font-medium text-lg">
                    {minutes < 10 ? `0${minutes}` : minutes}:{" "}
                    {seconds < 10 ? `0${seconds}` : seconds}
                  </div>
                ) : null}
              </div>
            </div>
            <React.Fragment>
              {registerState.currentStep.step === 1 ? (
                <div className="tabs mt-6 w-full flex justify-between flex-row">
                  {tabs.map((t) => (
                    <Link
                      key={t.name}
                      href={`#${t.name}`}
                      className={`tab-item flex flex-col flex-1 justify-center items-center font-medium text-xl leading-normal text-[#999999] ${
                        t.name === tabActive ? "active" : ""
                      }`}
                    >
                      {t.displayName}
                      <div className="bottom-menu"></div>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="tab-panel mt-5">
                {tabs.find((t) => t.name === tabActive)?.component}
              </div>
            </React.Fragment>
          </div>
        </div>
      </div>
    </>
  );
};
SignUpPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OnBoardLayout>{page}</OnBoardLayout>
    </>
  );
};
export default SignUpPage;
