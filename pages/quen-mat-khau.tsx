import { ReactElement } from "react";
import Head from "next/head";
import Image from "next/image";
import { Form, Input } from "antd";
import Link from "next/link";

import OnBoardLayout from "@/components/onboard-layout";
import { NextPageWithLayout } from "./_app";
import { backIcon, logo } from "@/constants/images";

const EmptyPage: NextPageWithLayout = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Head>
        <title>Quên mật khẩu</title>
      </Head>
      <div className="left-forgot-password"></div>
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
              <div className="welcome">Tìm lại mật khẩu</div>
            </div>
            <div className="form-sign-up">
              <Form layout="vertical" form={form} style={{ maxWidth: 600 }}>
                <Form.Item label="Nhập email khôi phục">
                  <Input size="large" placeholder="abc@gmail.com" />
                </Form.Item>
                <Form.Item>
                  <div className="group-action">
                    <button className="ibuild-btn forgot-password-btn">
                      Gửi mã xác nhận
                    </button>
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
