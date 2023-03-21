import FacebookLoginButton from "@/components/common/FacebookLoginButton";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import LockWrongPassword from "@/components/common/LockWrongPassword";
import OnBoardLayout from "@/components/onboard-layout";
import { backIcon, logo, unsplashLogin } from "@/constants/images";
import { ERRORS } from "@/constants/msg";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Spin } from "antd";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { ReactElement, useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "src/lib/api/api";
import { loginApi } from "src/lib/api/auth";
import { login } from "src/store/features/auth/auth";
import { validPassword } from "src/utils/validate";
import { NextPageWithLayout } from "./_app";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [expiresTime, setExpiresTime] = useState<number>(0);
  const [isLockEmail, setIsLockEmail] = useState(false);
  const [isDisabledButtonLogin, setIsDisabledButtonLogin] = useState(true);
  const [isInit, setIsInit] = useState(false);
  const onFinish = async (values: any) => {
    if (loading) return;
    const { email, password } = values;
    setLoading(true);
    const data = await loginApi({ email, password });
    const access_token = data?.access_token;
    const expires = data?.expires;

    if (access_token) {
      setToken(access_token);
      dispatch(login(access_token));
      setTimeout(() => {
        let redirectPath = router.query?.redirect || "/";
        if (typeof redirectPath === "object") {
          redirectPath = "/";
        }
        let currentQuery = router.query;
        delete currentQuery["redirect"];
        router.push({
          pathname: redirectPath,
          query: currentQuery,
        });
      }, 1000);
    }
    if (expires && expires !== "None") {
      setIsLockEmail(true);
      // expires : 2023-02-21 03:39:01.621610
      const expireTime = parseInt(expires);
      // countDownTime :  57277324
      setExpiresTime(expireTime);
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const onChangeValues = (changedValues: any, allValues: any) => {
    if (Object.keys(changedValues).includes("password")) {
      const valid = validPassword(changedValues.password);
      setIsDisabledButtonLogin(!valid);
      setIsInit(true);
    }
    if (Object.keys(changedValues).includes("email")) {
      const email = changedValues.email;
      if (email.includes(" ")) form.setFieldValue("email", email.trim());
    }
  };
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="hidden lg:flex flex-1 w-full h-full">
        <Image
          src={unsplashLogin}
          alt=""
          priority
          placeholder="blur"
          className="w-full h-full"
        />
      </div>
      <div className="w-full h-full flex-1">
        <div className="mx-0 my-[60px] lg:mx-20 lg:mt-20 lg:mb-10 flex flex-col justify-start min-h-[300px]">
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
              <div className="flex justify-between items-baseline text-[32px] mt-4 mb-8">
                {isLockEmail ? "Sai mật khẩu quá giới hạn" : null}
              </div>
            </div>
            {isLockEmail ? (
              <LockWrongPassword expires={expiresTime} />
            ) : (
              <React.Fragment>
                <div>
                  <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    scrollToFirstError
                    requiredMark={false}
                    onValuesChange={onChangeValues}
                    className="max-w-full"
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập email",
                        },
                        {
                          pattern:
                            // /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            /^[\w\s]+([\.-]?[\w\s]+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // allow space char
                          message: "Email đăng nhập chưa chính xác",
                        },
                      ]}
                    >
                      <Input size="large" placeholder="Nhập email đăng nhập" />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Nhập mật khẩu",
                        },
                        () => ({
                          validator(rule, value) {
                            if (value) {
                              if (!validPassword(value)) {
                                return Promise.reject(ERRORS.MSG002);
                              }
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                      label="Mật khẩu"
                    >
                      <Input.Password
                        size="large"
                        placeholder="Nhập mật khẩu"
                      />
                    </Form.Item>
                    <Form.Item>
                      <div className="flex justify-end">
                        <Link
                          className="font-roboto not-italic font-medium text-base leading-[150%] text-primary-color"
                          href={"/quen-mat-khau"}
                        >
                          Bạn quên mật khẩu?
                        </Link>
                      </div>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => (
                        <div>
                          <button
                            disabled={
                              form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length >
                                0 ||
                              loading ||
                              isDisabledButtonLogin
                            }
                            type="submit"
                            className="transition ease-in-out delay-150 duration-200 hover:-translate-y-1 hover:scale-110 w-full h-12 text-base font-medium flex justify-center items-center bg-primary-color rounded-lg text-white"
                          >
                            {loading ? (
                              <Spin indicator={antIcon} />
                            ) : (
                              "Đăng nhập"
                            )}
                          </button>
                          <div className="flex justify-end mt-6">
                            <span className="text-base font-normal leading-[150%] mr-2">
                              Bạn chưa có tài khoản?
                            </span>
                            <Link
                              href="/dang-ky"
                              className="no-underline font-medium text-primary-color font-roboto text-base leading-[150%] not-italic"
                            >
                              Đăng ký ngay
                            </Link>
                          </div>
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </div>

                <div className="w-full h-6 mt-8 text-center border-solid border-t-[#7f7f7f] border-t-[1px]">
                  <span className="font-normal font-roboto not-italic text-base bg-[#fff] px-8 py-0 relative top-[-16px]">
                    Đăng nhập bằng cách khác
                  </span>
                </div>
                <div>
                  <GoogleLoginButton />
                  <FacebookLoginButton />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
EmptyPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <OnBoardLayout>{page}</OnBoardLayout>
    </>
  );
};
export default EmptyPage;
