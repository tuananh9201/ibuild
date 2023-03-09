import React, { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import {
  backIcon,
  logo,
  signUpSuccess,
  unsplashSignUp,
} from "@/constants/images";
import Link from "next/link";
import { Form, Input, Spin } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { register } from "src/lib/api/auth";
import { setToken } from "src/lib/api/api";
import { useDispatch } from "react-redux";
import { login } from "src/store/features/auth/auth";
import { validatePassword } from "src/utils/validate";
import { RulePassword } from "src/lib/types";
import { rulePassword } from "@/constants/rules";
import { colorPrimary } from "@/constants/colors";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FormSignUpWithEmail = () => {
  return <div>Form</div>;
};
const FormSignUpWithPhone = () => {
  return <div>Form Phone</div>;
};

const tabs = [
  {
    name: "phone",
    component: <FormSignUpWithPhone />,
    displayName: "Số điện thoại",
  },
  { name: "email", component: <FormSignUpWithEmail />, displayName: "Email" },
];
const SignUpSuccess = () => {
  return (
    <div className="flex flex-col w-full items-center justify-center gap-6">
      <Image alt="" src={signUpSuccess} />
      <div className="font-normal text-base leading-normal">
        Cảm ơn bạn đã tạo tài khoản iBuild. Hãy sử dụng tài khoản này để nghiên
        cứu, tham khảo thông tin và nhiều điều thú vị về xây dựng do iBuild cung
        cấp nhé.
      </div>
    </div>
  );
};

const SignUpPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();
  const [isinitPage, setIsinitPage] = useState(true);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [showErrorDiffPassword, setShowErrorDiffPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [rules, setRules] = useState<RulePassword[]>(rulePassword);
  const [tabActivate, setTabActivate] = useState("phone");
  const onFinish = async (values: any) => {
    const credential = {
      email: values.email,
      password,
    };
    if (password !== cPassword) {
      setShowErrorDiffPassword(true);
      return;
    }
    setShowErrorDiffPassword(false);
    setLoadingRegister(true);
    const accessToken = await register(credential);
    if (accessToken) {
      setToken(accessToken);
      dispatch(login(accessToken));
      setIsSuccess(true);
    }
    setLoadingRegister(false);
  };
  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const results = validatePassword(value);
    setRules(results);
    const isValid = results.filter((r) => r.success);
    setIsValidPassword(isValid.length === rulePassword.length);
    setIsinitPage(false);
  };

  const onChangeCPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCPassword(value);
    setIsinitPage(value.length === 0);
    if (value.length === 0) {
      setShowErrorDiffPassword(false);
    }
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (isSuccess) {
        router.push({
          pathname: "/",
        });
      }
    }, 5000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

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
          src={unsplashSignUp}
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1">
        <div className="flex flex-col justify-start mt-20 mr-10 mb-auto ml-10 min-h-[300px]">
          <div className="flex flex-row justify-start px-5 py-2 ">
            {isSuccess ? null : (
              <Link href="/">
                <Image src={backIcon} alt="" />
              </Link>
            )}
          </div>
          <div className="mx-20 my-14 w-full">
            <div>
              <div className="flex justify-center items-center max-w-[120px] max-h-[30px]">
                <Image src={logo} alt="" />
              </div>
              <div className="mt-4 mb-8 text-3xl flex justify-between items-baseline">
                {isSuccess ? "Tạo tài khoản thành công" : "Tạo tài khoản"}
              </div>
            </div>

            {isSuccess ? (
              <motion.div
                key="noti"
                animate={{ opacity: isSuccess ? 1 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                <SignUpSuccess />
              </motion.div>
            ) : (
              <React.Fragment>
                <ul className="tabs mt-6 w-full flex justify-between">
                  {tabs.map((t) => (
                    <li
                      className={`group flex flex-col flex-1 items-center justify-center font-medium text-xl leading-normal text-[#999999] hover:text-primary-color hover:cursor-pointer hover:border-primary-color  ${
                        tabActivate === t.name ? "active" : ""
                      } `}
                      key={t.name}
                    >
                      <div className="w-full space-x-8 text-center">
                        {t.displayName}
                      </div>
                      <div className="w-11 focus:text-primary-color focus:border-b-2 group-hover:text-primary-color group-hover:border-b-2 group-hover:border-primary-color text-center"></div>
                    </li>
                  ))}
                </ul>
                <div className="tab-content mt-5">
                  {tabs.find((t) => t.name === tabActivate)?.component}
                </div>
              </React.Fragment>
            )}
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
