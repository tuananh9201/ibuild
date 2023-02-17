import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import {
  backIcon,
  facebookIcon,
  logo,
  unsplashLogin,
} from "@/constants/images";
import Link from "next/link";
import { Form, Input } from "antd";
import GoogleLoginButton from "@/components/common/GoogleLoginButton";
import FacebookLoginButton from "@/components/common/FacebookLoginButton";
const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log(values);
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
            <Image src={backIcon} alt="" />
          </div>
          <div className="right-signin-container-content">
            <div className="heading">
              <div className="logo">
                <Image src={logo} alt="" />
              </div>
              <div className="welcome"></div>
            </div>
            <div className="form-sign-up">
              <Form
                layout="vertical"
                onFinish={onFinish}
                form={form}
                style={{ maxWidth: "100%" }}
                scrollToFirstError
              >
                <Form.Item
                  label="Email"
                  name="email"
                  requiredMark={false}
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên đăng nhập",
                    },
                    {
                      type: "email",
                      message: "* Email không đúng định dạng",
                    },
                  ]}
                >
                  <Input size="large" placeholder="Nhập email đăng nhập" />
                </Form.Item>
                <Form.Item
                  requiredMark={false}
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
                  label="Mật khẩu "
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
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
                <Form.Item>
                  <div className="group-action">
                    <button type="submit" className="ibuild-btn signin">
                      Đăng nhập
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
