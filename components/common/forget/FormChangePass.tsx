import React from "react";
import { Form, Input, Typography } from "antd";
import { motion } from "framer-motion";

import { IbuildButton } from "@/components/common";

type Props = {
  isLoading: boolean;
};

function FormChangePass({ isLoading }: Props) {
  const [form] = Form.useForm();

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={onSubmit}
        style={{ maxWidth: "100%" }}
      >
        <div style={{ marginBottom: "24px" }}>
          <p className="base-text">
            Việc thay đổi mật khẩu của bạn sẽ khiến đăng xuất khỏi tất cả các
            thiết bị. Bạn cần phải nhập mật khẩu mới trên tất cả các thiết bị
            khi đăng nhập lại.
          </p>
        </div>
        <Form.Item
          name="newPassword"
          label={
            <p>
              Mật khẩu mới <span style={{ color: "red" }}>*</span>
            </p>
          }
          rules={[
            {
              required: true,
              message: "Nhập mật khẩu mới",
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
          name="confirmPassword"
          label={
            <p>
              Nhập lại mật khẩu <span style={{ color: "red" }}>*</span>
            </p>
          }
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("* Mật khẩu không trùng nhau"));
              },
            }),
          ]}
          hasFeedback
          dependencies={["newPassword"]}
        >
          <Input.Password size="large" placeholder="Nhập mật khẩu" />
        </Form.Item>
        <Form.Item>
          {() => (
            <IbuildButton
              prefix={<span>Đổi mật khẩu</span>}
              type="submit"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0 ||
                isLoading ||
                !form.getFieldValue("email")
              }
            />
          )}
        </Form.Item>
      </Form>
    </motion.div>
  );
}

export default FormChangePass;
