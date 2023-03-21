import React from "react";
import { motion } from "framer-motion";
import { LoadingOutlined } from "@ant-design/icons";

import { Form, Input, Spin } from "antd";
import { validateEmailOrPhoneNumber } from "src/utils/validate";
import { ERRORS } from "@/constants/msg";

type Props = {
  isLoading: boolean;
  handleSendEmailSubmit: (email: string) => void;
  onFailed: () => void;
};

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const FormForgetPassword = ({ handleSendEmailSubmit, isLoading }: Props) => {
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    const { email } = values;
    handleSendEmailSubmit(email);
  };

  return (
    <motion.div
      key="form-forgot"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      }}
      className="w-full"
    >
      <Form
        onFinish={onFinish}
        layout="vertical"
        form={form}
        className="w-full"
        requiredMark={false}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="Nhập email hoặc số điện thoại khôi phục"
          rules={[
            {
              required: true,
              message: "Nhập email hoặc số điện thoại khôi phục",
            },
            () => ({
              validator(rule, value) {
                if (value) {
                  if (!validateEmailOrPhoneNumber(value)) {
                    return Promise.reject(ERRORS.MSG012);
                  }
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input size="large" placeholder="Ví dụ: abc@gmail.com hoặc 0983..." />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <div className="group-action">
              <button
                className="transition ease-in-out delay-150 duration-100 hover:-translate-y-1 hover:scale-110 w-full h-12 text-base font-medium flex justify-center items-center bg-primary-color rounded-lg text-white"
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
