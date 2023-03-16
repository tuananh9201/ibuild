import { Form, Input } from "antd";
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
      key="form-otp"
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
      <div className="font-normal text-base text-[#333333] leading-6 mt-4">
        Để giữ an toàn cho tài khoản của bạn, iBuild muốn đảm bảo rằng bạn chính
        là người đang cố đăng nhập
      </div>
      <div className="font-normal text-base text-[#333333] leading-6 mt-4">
        iBuild vừa gửi mã xác minh đến email hoặc số điện thoại của bạn. Vui
        lòng kiểm tra để lấy mã và nhập vào bên dưới.
      </div>
      <div className="font-normal text-base text-[#333333] leading-6 my-4">
        Thời gian tồn tại của mã xác nhận là 10 phút, khi hết thời gian đếm
        ngược xin vui lòng lấy lại mã xác nhận mới
      </div>
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={onSubmit}
        className="w-full"
      >
        <Form.Item
          name="confirmCode"
          rules={[
            {
              pattern: /^[0-9]{6}$/,
              message: "Mã xác nhận chưa chính xác",
            },
          ]}
        >
          <Input size="large" placeholder="Nhập mã xác nhận" />
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <IbuildButton
              prefix={<span>Tiếp tục</span>}
              type="submit"
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0 ||
                !form.getFieldValue("confirmCode") ||
                isLoading ||
                isShowResendCodeBtn
              }
              isLoading={isLoading}
            />
          )}
        </Form.Item>
        {/* </Typography> */}
      </Form>
      <div className="resend mt-4 flex justify-center w-full">
        <div className="text-primary-color font-medium text-base ">
          <button
            disabled={!isShowResendCodeBtn}
            onClick={() => {
              resendCode(email);
            }}
            className="flex justify-center items-center gap-1 disabled:bg-transparent disabled:text-[#999999]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_768_126)">
                <path
                  d="M15.2086 5.89046C13.8502 4.53212 11.9252 3.74879 9.80855 3.96546C6.75022 4.27379 4.23355 6.75712 3.89189 9.81546C3.43355 13.8571 6.55855 17.2655 10.5002 17.2655C13.1586 17.2655 15.4419 15.7071 16.5086 13.4655C16.7752 12.9071 16.3752 12.2655 15.7586 12.2655C15.4502 12.2655 15.1586 12.4321 15.0252 12.7071C14.0836 14.7321 11.8252 16.0155 9.35855 15.4655C7.50855 15.0571 6.01689 13.5488 5.62522 11.6988C4.92522 8.46546 7.38355 5.59879 10.5002 5.59879C11.8836 5.59879 13.1169 6.17379 14.0169 7.08212L12.7586 8.34046C12.2336 8.86546 12.6002 9.76546 13.3419 9.76546H16.3336C16.7919 9.76546 17.1669 9.39046 17.1669 8.93212V5.94046C17.1669 5.19879 16.2669 4.82379 15.7419 5.34879L15.2086 5.89046Z"
                  fill={isShowResendCodeBtn ? "#4F86FF" : "#999999"}
                />
              </g>
              <defs>
                <clipPath id="clip0_768_126">
                  <rect
                    width="20"
                    height="20"
                    fill="white"
                    transform="translate(0.5 0.599609)"
                  />
                </clipPath>
              </defs>
            </svg>
            <span>Gửi lại mã xác nhận</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
