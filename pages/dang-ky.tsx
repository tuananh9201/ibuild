import { ReactElement } from "react";
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
import { Form, Input, message } from "antd";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { register } from "lib/api/auth";
import { setToken } from "lib/api/api";
import { useDispatch, useSelector } from "react-redux";
import { login } from "store/features/auth/auth";
import { RootState } from "store/store";
const SignUpSuccess = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
      }}
    >
      <Image alt="" src={signUpSuccess} />
      <div
        style={{
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "150%",
        }}
      >
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
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const onFinish = async (values: any) => {
    const credential = {
      email: values.email,
      password: values.password,
    };
    setLoadingRegister(true);
    const accessToken = await register(credential);
    // setLoadingRegister(false);
    if (accessToken) {
      setToken(accessToken);
      dispatch(login(accessToken));
    }
    setIsSuccess(true);
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
      <div className="left-signup">
        <Image
          style={{
            width: "100%",
            height: "100%",
          }}
          src={unsplashSignUp}
          alt=""
        />
      </div>
      <div className="right-signin">
        <div className="right-signin-container">
          <div className="right-signin-container-nav">
            {isSuccess ? null : (
              <Link href="/onboard">
                <Image src={backIcon} alt="" />
              </Link>
            )}
          </div>
          <div className="right-signin-container-content">
            <div className="heading">
              <div className="logo">
                <Image src={logo} alt="" />
              </div>
              <div className="welcome">
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
              <motion.div
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                className="form-sign-up"
              >
                <Form
                  onFinish={onFinish}
                  layout="vertical"
                  form={form}
                  style={{ maxWidth: "100%" }}
                  requiredMark={false}
                  scrollToFirstError
                >
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập tên đăng nhập",
                      },
                      {
                        type: "email",
                        message: "Email không hợp lệ",
                      },
                      // {
                      //   validator: (_, value) =>
                      //     value
                      //       ? Promise.resolve()
                      //       : Promise.reject(
                      //           new Error("Should accept agreement")
                      //         ),
                      // },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập tên đăng nhập" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label={
                      <div>
                        {" "}
                        Mật khẩu <span style={{ color: "red" }}>*</span>{" "}
                      </div>
                    }
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
                  >
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <Form.Item
                    name="confirm"
                    label={
                      <div>
                        {" "}
                        Nhập lại mật khẩu{" "}
                        <span style={{ color: "red" }}>*</span>{" "}
                      </div>
                    }
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng nhập mật khẩu",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("Nhập lại mật khẩu không đúng")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  </Form.Item>
                  <Form.Item>
                    <div className="group-action">
                      <button
                        disabled={loadingRegister}
                        className="ibuild-btn signin"
                      >
                        Đăng ký
                      </button>
                      <div className="register-link">
                        <span className="have-account">
                          Bạn đã có tài khoản?
                        </span>
                        <Link href="/dang-nhap" className="register-now">
                          Đăng nhập ngay
                        </Link>
                      </div>
                    </div>
                  </Form.Item>
                </Form>
              </motion.div>
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
