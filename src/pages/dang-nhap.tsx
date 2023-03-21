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
import { validateEmailOrPhoneNumber } from "src/utils/validate";
import { NextPageWithLayout } from "./_app";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [expiresTime, setExpiresTime] = useState<number>(0);
  const [isLockEmail, setIsLockEmail] = useState(false);
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
      <div className="w-full h-full flex-1 hidden lg:block">
        <Image
          priority
          placeholder="blur"
          className="w-full h-full"
          src={unsplashLogin}
          alt=""
        />
      </div>
      <div className="w-full h-full flex-1">
        <div className="flex flex-col justify-start mt-2 lg:mt-20 lg:mr-10 lg:mb-auto lg:ml-10">
          <div className="flex justify-start px-5 lg:px-2 lg:py-5">
            <Link href="/">
              <Image src={backIcon} alt="" />
            </Link>
          </div>
          <div className="my-12 mx-5 md:my-20 md:mx-14 ">
            <div className="heading">
              <div className="flex justify-center items-center max-w-[120px] max-h[30px]">
                <Image src={logo} alt="" />
              </div>
              <div className="mt-4 mb-8 flex justify-between items-baseline text-2xl">
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
                      label="Email hoặc số điện thoại đăng nhập"
                      name="email"
                      validateTrigger="onBlur"
                      rules={[
                        {
                          required: true,
                          message: "Nhập email hoặc số điện thoại đăng nhập",
                        },
                        () => ({
                          validator(rule, value) {
                            if (value) {
                              if (!validateEmailOrPhoneNumber(value)) {
                                return Promise.reject(ERRORS.MSG012);
                              }
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input
                        size="large"
                        placeholder="Ví dụ: abc@gmail.com hoặc 0983..."
                      />
                    </Form.Item>
                    <Form.Item
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Nhập mật khẩu",
                        },
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
                              !form.getFieldValue("email") ||
                              !form.getFieldValue("password") ||
                              loading
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
                          <div className="mt-6 flex justify-end">
                            <span className="mr-2 text-base font-normal">
                              Bạn chưa có tài khoản?
                            </span>
                            <Link
                              href="/dang-ky"
                              className="font-medium text-primary-color text-base"
                            >
                              Đăng ký ngay
                            </Link>
                          </div>
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </div>

                <div className="mt-8 w-full h-8 text-center border-t border-solid border-[#7f7f7f]">
                  <span className="font-normal bg-white py-0 px-4 relative top-[-11px]">
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
