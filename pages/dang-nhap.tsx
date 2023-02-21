import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { backIcon, facebookIcon, googleIcon, logo } from "@/constants/images";
import Link from "next/link";
import { Form, Input } from "antd";
const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Head>
        <title>Đăng nhập</title>
      </Head>
      <div className="left-signin"></div>
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
              <div className="welcome">Chào mừng quay trở lại!</div>
            </div>
            <div className="form-sign-up">
              <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
                <Form.Item label="Tên đăng nhập">
                  <Input size="large" placeholder="Nhập tên đăng nhập" />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      {" "}
                      Mật khẩu <span style={{ color: "red" }}>*</span>{" "}
                    </div>
                  }
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                  <div className="forgot-password">
                    <Link href={"/quen-mat-khau"}>Bạn quên mật khẩu?</Link>
                  </div>
                </Form.Item>
                <Form.Item>
                  <div className="group-action">
                    <button className="ibuild-btn signin">Đăng nhập</button>
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
              <button className="sign-other-btn sign-google">
                <Image src={googleIcon} alt="" /> Đăng nhập bằng tài khoản
                Google
              </button>
              <button className="sign-other-btn sign-facebook">
                <Image src={facebookIcon} alt="" /> Đăng nhập bằng tài khoản
                Facebook
              </button>
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
