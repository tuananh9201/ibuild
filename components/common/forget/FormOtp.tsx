import { Form, Input, Typography } from "antd";
import { motion } from "framer-motion";

import { IbuildButton } from "@/components/common";

type Props = {
  handleConfirmCodeSubmit: (email: string) => void;
  isLoading: boolean;
  email: string;
  isShowResendCodeBtn: boolean;
  handleResendCode: (email: string) => void;
};

export default function FormOtp({
  handleConfirmCodeSubmit,
  isLoading = false,
  email,
  isShowResendCodeBtn,
  handleResendCode,
}: Props) {
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    const { confirmCode } = values;
    handleConfirmCodeSubmit(confirmCode);
  };

  const resendCode = (email: string) => {
    handleResendCode(email);
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
          <Typography.Paragraph className="base-text">
            Để giữ an toàn cho tài khoản của bạn, iBuild muốn đảm bảo rằng bạn
            chính là người đang cố đăng nhập
          </Typography.Paragraph>
          <Typography.Paragraph className="base-text">
            iBuild vừa gửi email chứa mã xác minh đến địa chỉ email khôi phục
            của bạn là {email || "abc@gmail.com"}. Vui lòng kiểm tra email này
            để lấy mã và nhập vào bên dưới.
          </Typography.Paragraph>
          <Typography.Paragraph className="base-text">
            Thời gian tồn tại của mã xác nhận là 10 phút, khi hết thời gian đếm
            ngược xin vui lòng lấy lại mã xác nhận mới
          </Typography.Paragraph>
          <Form.Item
            name="confirmCode"
            rules={[
              {
                max: 6,
                message: "Mã xác nhận bao gồm 6 chữ số",
              },
              {
                min: 6,
                message: "Mã xác nhận bao gồm 6 chữ số",
              },
            ]}
          >
            <Input size="large" placeholder="Nhập mã xác nhận" />
          </Form.Item>
          <Form.Item shouldUpdate>
            {() => (
              <div>
                <IbuildButton
                  prefix={<span>Tiếp tục</span>}
                  type="submit"
                  disabled={
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0 ||
                    !form.getFieldValue("confirmCode") ||
                    isLoading
                  }
                  isLoading={isLoading}
                />
              </div>
            )}
          </Form.Item>
          {isShowResendCodeBtn ? (
            <Form.Item shouldUpdate>
              {() => (
                <div>
                  <IbuildButton
                    prefix={<span>Gửi lại mã xác nhận</span>}
                    type="button"
                    onClick={() => resendCode(email)}
                  />
                </div>
              )}
            </Form.Item>
          ) : (
            <></>
          )}
        </Typography>
      </Form>
    </motion.div>
  );
}
