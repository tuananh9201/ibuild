import { ERRORS } from "@/constants/msg";
import { Form, Input, Spin } from "antd";
import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import FormInputPhoneOTP from "./FormInputPhoneOTP";
import { useDispatch, useSelector } from "react-redux";
import { changeStep } from "src/store/features/auth/register";
import { RootState } from "src/store/store";
import ChangePassFailed from "../common/forget/ChangePassFailed";

type Props = {};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
function FormRegisterWithPhone(props: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [initForm, setInitForm] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();
  const registerState = useSelector((state: RootState) => state.register);

  const onFinish = (values: any) => {
    dispatch(changeStep(2));
    setIsSuccess(true);
  };
  if (registerState.currentStep.step === 4) {
    return <ChangePassFailed expires={24 * 60 * 60} />;
  }
  return isSuccess ? (
    <FormInputPhoneOTP />
  ) : (
    <Form
      onFinish={onFinish}
      layout="vertical"
      form={form}
      style={{ maxWidth: "100%" }}
      requiredMark={false}
      scrollToFirstError
      onValuesChange={() => {
        setInitForm(false);
      }}
    >
      <Form.Item
        name="phone"
        label={
          <div>
            {" "}
            Số điện thoại <span className="text-red-600">*</span>
          </div>
        }
        rules={[
          {
            pattern: /(84|840|0)+([0-9]{9})\b/,
            message: ERRORS.MSG011,
          },
          {
            required: true,
            message: "Nhập số điện thoại",
          },
        ]}
      >
        {/* <Input size="large" placeholder="Ví dụ: 0983..." /> */}
        <input
          placeholder="Ví dụ: 0983..."
          className="h-12 w-full px-2 bg-white border-[#9A9A9A] border border-solid rounded-lg placeholder:text-[#717171]"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <div>
            <button
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0 || initForm
              }
              className="w-full h-12 text-base font-medium flex justify-center items-center bg-primary-color rounded-lg text-white"
            >
              {loading ? <Spin indicator={antIcon} /> : "Nhận OTP"}
            </button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
}

export default FormRegisterWithPhone;
