import { motion } from "framer-motion";
import { Form, Input, Typography } from "antd";

import { IbuildButton } from "@/components/common";

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
        <Typography>
          <Typography.Paragraph>
            Để giữ an toàn cho tài khoản của bạn, iBuild muốn đảm bảo rằng bạn
            chính là người đang cố đăng nhập
          </Typography.Paragraph>
          <Typography.Paragraph>
            iBuild vừa gửi email chứa mã xác minh đến địa chỉ email khôi phục
            của bạn là abc@gmail.com. Vui lòng kiểm tra email này để lấy mã và
            nhập vào bên dưới.
          </Typography.Paragraph>
          <Form.Item name="confirmCode">
            <Input size="large" placeholder="Nhập mã xác nhận" />
          </Form.Item>
          <Form.Item>
            <div>
              <IbuildButton prefix={<span>Tiếp tục</span>} type="submit" />
            </div>
          </Form.Item>
        </Typography>
      </Form>
    </motion.div>
  );
}
