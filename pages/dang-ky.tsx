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
  const handleSubmit = async () => {
    // e.preventDefault()
    form.submit();
  };
  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const validatorPassword = (rule: any, value: any, callback: any) => {
    console.log("rule :", rule);
    console.log("value :", value);
    console.log("callback :", callback);
    try {
      throw new Error("Something wrong!");
    } catch (err) {
      callback(err);
    }
  };
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
              <Form
                onFinish={onFinish}
                layout="vertical"
                form={form}
                style={{ maxWidth: 600 }}
                requiredMark={false}
                scrollToFirstError
              >
                <Form.Item
                  name="email"
                  label="Tên đăng nhập"
                  rules={[
                    { required: true, message: "Vui lòng nhập tên đăng nhập" },
                    {
                      type: "email",
                      message: "Email không hợp lệ",
                    },
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
                  hasFeedback
                >
                  <Input.Password size="large" placeholder="Nhập mật khẩu" />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  label={
                    <div>
                      {" "}
                      Nhập lại mật khẩu <span style={{ color: "red" }}>
                        *
                      </span>{" "}
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
                      onClick={() => {
                        console.log("***");
                        handleSubmit();
                      }}
                      type="submit"
                      className="ibuild-btn signin"
                    >
                      Đăng ký
                    </button>
                    <div className="register-link">
                      <span className="have-account">Bạn đã có tài khoản?</span>
                      <Link href="/dang-nhap" className="register-now">
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
