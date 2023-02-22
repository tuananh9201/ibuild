import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import { Form, Input, Typography } from "antd";
import { Clock } from "@/constants/images";
import { LoadingComponent } from "@/components/common";

type Props = {
  handleConfirmCodeSubmit: (email: string) => void;
  isLoading: boolean;
};

export default function FormOtp({
  handleConfirmCodeSubmit,
  isLoading = false,
}: Props) {
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const { code } = values;
    handleConfirmCodeSubmit(code);
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
      className=""
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={onSubmit}
        style={{ maxWidth: "100%" }}
      >
        <Form.Item>
          <Image
            src={Clock}
            alt="otp"
            priority={true}
            style={{ margin: "0 auto" }}
          />
        </Form.Item>
        <Form.Item
          name="code"
          label="Mã xác nhận để tìm lại mật khẩu của bạn là:"
        >
          <Input size="large" placeholder="Nhập mã xác nhận" />
        </Form.Item>
        <Form.Item>
          <Typography>
            <Typography.Paragraph>
              - Thời gian tồn tại của mã xác nhận là 10p
            </Typography.Paragraph>
            <Typography.Paragraph>
              - Để đảm bảo tài khoản của bạn, đừng chuyển tiếp email này hoặc
              cung cấp mã này cho bất kì ai.
            </Typography.Paragraph>
          </Typography>
        </Form.Item>
        <Form.Item>
          <div className="group-action">
            <button
              className="ibuild-btn signin"
              disabled={form.getFieldValue("code")?.length === 0}
              type="submit"
            >
              {isLoading ? <LoadingComponent /> : "Tiếp tục"}
            </button>
          </div>
        </Form.Item>
      </Form>
    </motion.div>
  );
}
