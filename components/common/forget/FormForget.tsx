import React from "react";
import { motion } from "framer-motion";
import { Form, Input } from "antd";

type Props = {
  onSuccess: () => void;
  onFailed: () => void;
};

const FormForgetPassword = (props: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    props.onSuccess();
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
              message: "Vui lòng nhập tên đăng nhập",
            },
            {
              type: "email",
              message: "Email không hợp lệ",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập email" />
        </Form.Item>

        <Form.Item>
          <div className="group-action">
            <button className="ibuild-btn signin">Gửi mã xác nhận</button>
          </div>
        </Form.Item>
      </Form>
    </motion.div>
  );
};
export default FormForgetPassword;
