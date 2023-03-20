import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import Image from "next/image";
import { backIcon, logo, unsplashSignUp2 } from "@/constants/images";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import FormRegisterWithEmail from "@/components/register/FormRegisterWithEmail";
import FormRegisterWithPhone from "@/components/register/FormRegisterWithPhone";
import { RootState } from "src/store/store";
import { showResendButton } from "src/store/features/auth/register";
import AuthLayout from "@/components/layouts/AuthLayout";

const SignUpPage: NextPageWithLayout = () => {
  const router = useRouter();
  const [tabActive, setTabActive] = useState("phone");
  const dispatch = useDispatch();
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
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
      setTimeRemaining(10 * 60);
    }
  }, [registerState.showResendButton]);

  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;
  const selectedTab = tabs.find((t) => t.name === tabActive);
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
        <div className="flex flex-col justify-start mt-2 lg:mt-20 lg:mr-10 lg:mb-auto lg:ml-10 min-h-[300px]">
          <div className="flex flex-row justify-start px-5 py-2 ">
            {registerState.currentStep.step > 2 ? null : (
              <Link href="/">
                <Image src={backIcon} alt="" />
              </Link>
            )}
          </div>
          <div className="mx-4 my-8 lg:mx-20 lg:my-14">
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
                <ul className="mt-6 w-full flex justify-between flex-row">
                  {tabs.map((t) => (
                    <li
                      key={t.name}
                      className={`group  flex flex-col flex-1 justify-center items-center hover:cursor-pointer ${
                        t.name === tabActive ? "active" : ""
                      }`}
                    >
                      <Link
                        href={`#${t.name}`}
                        className="font-medium text-xl leading-normal text-[#999999] hover:text-primary-color group-[.active]:text-primary-color"
                      >
                        {t.displayName}
                      </Link>
                      <div className="dot hidden group-[.active]:block w-12 border-b-2 border-solid border-primary-color"></div>
                    </li>
                  ))}
                </ul>
              ) : null}
              <div className="tab-panel mt-5">{selectedTab?.component}</div>
              {registerState.currentStep.step === 1 ? (
                <div className="mt-6 flex flex-row justify-end items-center">
                  <span className="font-normal mr-2 text-base leading-normal">
                    Bạn đã có tài khoản?
                  </span>
                  <Link
                    href="/dang-nhap"
                    className="font-medium no-underline text-primary-color"
                  >
                    Đăng nhập ngay
                  </Link>
                </div>
              ) : null}
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
      <AuthLayout>{page}</AuthLayout>
    </>
  );
};
export default SignUpPage;
