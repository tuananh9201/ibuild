import { ReactElement } from "react";
import { NextPageWithLayout } from "./_app";
import Head from "next/head";
import OnBoardLayout from "@/components/onboard-layout";
import Image from "next/image";
import { backIcon, logo } from "@/constants/images";
import Link from "next/link";
import { Form, Input } from "antd";
const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();
  return (
    <>
      <Head>
        <title>Đăng ký</title>
      </Head>
      <div className="left-signup"></div>
      <div className="right-signin">
        <div className="right-signin-container">
          <div className="right-signin-container-nav">
            <Link href="/onboard">
              <Image src={backIcon} alt="" />
            </Link>
          </div>
          <div className="right-signin-container-content">
            <div className="heading">
              <div className="logo">
                <Image src={logo} alt="" />
              </div>
              <div className="welcome">Tạo tài khoản</div>
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
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      {" "}
                      Nhập lại mật khẩu <span style={{ color: "red" }}>
                        *
                      </span>{" "}
                    </div>
                  }
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item>
                  <div className="group-action">
                    <button type="submit" className="ibuild-btn signin">
                      Đăng ký
                    </button>
                    <div className="register-link">
                      <span className="have-account">Bạn đã có tài khoản?</span>
                      <Link href="/dang-ky" className="register-now">
                        Đăng nhập ngay
                      </Link>
                    </div>
                  </div>
                </Form.Item>
              </Form>
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
