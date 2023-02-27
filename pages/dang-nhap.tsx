import React, { ReactElement, useState } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { backIcon, logo, unsplashLogin } from "@/constants/images";
import Link from "next/link";
import { Form, Input, Spin } from "antd";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import FacebookLoginButton from "@/components/common/FacebookLoginButton";
import { loginApi } from "lib/api/auth";
import { setToken } from "lib/api/api";
import { useDispatch } from "react-redux";
import { login } from "store/features/auth/auth";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import LockWrongPassword from "@/components/common/LockWrongPassword";

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

  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="left-signin">
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          src={unsplashLogin}
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
                {isLockEmail ? "Sai mật khẩu quá giới hạn" : null}
              </div>
            </div>
            {isLockEmail ? (
              <LockWrongPassword expires={expiresTime} />
            ) : (
              <React.Fragment>
                <div className="form-sign-up">
                  <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={form}
                    style={{ maxWidth: "100%" }}
                    scrollToFirstError
                    requiredMark={false}
                  >
                    <Form.Item
                      label="Email"
                      name="email"
                      validateTrigger="onBlur"
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Vui lòng nhập tên email",
                        },
                        {
                          type: "email",
                          message: "Tên đăng nhập chưa chính xác",
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
                        {
                          min: 8,
                          message: "Mật khẩu từ 8-20 ký tự",
                        },
                        {
                          max: 20,
                          message: "Mật khẩu từ 8-20 ký tự",
                        },
                        {
                          pattern: /[!@#$%^&*()]/,
                          message: "Ký tự đặc biệt",
                        },
                        {
                          pattern: /[A-Z]/,
                          message: "Ký tự in hoa",
                        },
                        {
                          pattern: /[a-z]/,
                          message: "Ký tự thường",
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
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                        }}
                      >
                        <Link className="register-now" href={"/quen-mat-khau"}>
                          Bạn quên mật khẩu?
                        </Link>
                      </div>
                    </Form.Item>
                    <Form.Item shouldUpdate>
                      {() => (
                        <div className="group-action">
                          <button
                            disabled={
                              form
                                .getFieldsError()
                                .filter(({ errors }) => errors.length).length >
                                0 || loading
                            }
                            type="submit"
                            className="ibuild-btn signin"
                          >
                            {loading ? (
                              <Spin indicator={antIcon} />
                            ) : (
                              "Đăng nhập"
                            )}
                          </button>
                          <div className="register-link">
                            <span className="have-account">
                              Bạn chưa có tài khoản?
                            </span>
                            <Link href="/dang-ky" className="register-now">
                              Đăng ký ngay
                            </Link>
                          </div>
                        </div>
                      )}
                    </Form.Item>
                  </Form>
                </div>

                <div className="sign-seperator">
                  <span className="sepe-title">Đăng nhập bằng cách khác</span>
                </div>
                <div className="signin-other-platform">
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
