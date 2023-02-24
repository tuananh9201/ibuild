import React from "react";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";

import { Form, Input, Spin } from "antd";

type Props = {
  isLoading: boolean;
  handleSendEmailSubmit: (email: string) => void;
  onFailed: () => void;
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FormForgetPassword = ({
  handleSendEmailSubmit,
  onFailed,
  isLoading,
}: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const { email } = values;
    handleSendEmailSubmit(email);
  };

  return (
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
          label="Nhập email khôi phục"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập Email",
            },
            {
              type: "email",
              message: "Email không đúng định dạng",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập email" />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <div className="group-action">
              <button
                className="ibuild-btn signin"
                disabled={
                  form.getFieldsError().filter(({ errors }) => errors.length)
                    .length > 0 ||
                  isLoading ||
                  !form.getFieldValue("email")
                }
                type="submit"
              >
                {isLoading ? <Spin indicator={antIcon} /> : "Gửi mã xác nhận"}
              </button>
            </div>
          )}
        </Form.Item>
      </Form>
    </motion.div>
  );
};
export default FormForgetPassword;
