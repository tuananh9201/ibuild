import { Form, Input, message } from "antd";
import { motion } from "framer-motion";
import React from "react";

import { IbuildButton } from "@/components/common";
import { rulePassword } from "@/constants/rules";
import { useState } from "react";
import { resetPassword } from "src/lib/api/auth";
import { RulePassword } from "src/lib/types";
import { validatePassword } from "src/utils/validate";

type Props = {
  onSuccess: (cred: { email: string; password: string }) => void;
  email: string;
  code: string;
};

function FormChangePass({ onSuccess, email, code }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [rules, setRules] = useState<RulePassword[]>(rulePassword);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const onSubmit = async (values: any) => {
    setLoading(true);
    setDisabledSubmit(true);
    if (password !== cPassword) {
      message.error("Mật khẩu không trùng nhau");
      setLoading(false);
      setDisabledSubmit(false);
      return;
    }
    const params = {
      new_password: password,
      email,
      code,
    };
    const res = await resetPassword(params);
    if (res) {
      onSuccess({ email, password });
    }
    setDisabledSubmit(false);
    setLoading(false);
  };

  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const results = validatePassword(value);
    setRules(results);
    const isValid = results.filter((r) => r.success);
    setIsValidPassword(isValid.length === rulePassword.length);
  };
  const onChangeValuesConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setCPassword(value);
    setDisabledSubmit(value.length === 0);
  };

  return (
    <motion.div
      key="form-change-pass"
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5,
      }}
    >
      <Form
        layout="vertical"
        form={form}
        requiredMark={false}
        onFinish={onSubmit}
        // style={{ maxWidth: "100%" }}
        className="w-full"
        scrollToFirstError
      >
        <div className="mb-6">
          <p className="text-base font-normal leading-6">
            Việc thay đổi mật khẩu của bạn sẽ khiến đăng xuất khỏi tất cả các
            thiết bị. Bạn cần phải nhập mật khẩu mới trên tất cả các thiết bị
            khi đăng nhập lại.
          </p>
        </div>
        <Form.Item
          name="newPassword"
          label={
            <p>
              Mật khẩu mới <span className="text-red-500">*</span>
            </p>
          }
        >
          <React.Fragment>
            <Input.Password
              onChange={onChangeValues}
              size="large"
              placeholder="Nhập mật khẩu"
            />
            <div className="mx-4 mt-2 -mb-2 font-normal text-sm leading-[150%]">
              <ul>
                {rules.map((rule) => (
                  <li
                    key={rule.code}
                    className={`list-disc ${rule.init ? "" : rule.success ? "text-[#4d993d]" : ""}`}
                  >
                    {rule.message}
                  </li>
                ))}
              </ul>
            </div>
          </React.Fragment>
        </Form.Item>
        <Form.Item
          shouldUpdate
          label={
            <p>
              Nhập lại mật khẩu <span className="text-red-500">*</span>
            </p>
          }
        >
          {() => (
            <React.Fragment>
              <Input.Password
                disabled={!isValidPassword}
                size="large"
                placeholder="Nhập mật khẩu"
                onChange={onChangeValuesConfirmPassword}
              />
            </React.Fragment>
          )}
        </Form.Item>
        <Form.Item shouldUpdate>
          {() => (
            <IbuildButton
              prefix={<span>Đổi mật khẩu</span>}
              type="submit"
              disabled={disabledSubmit || loading}
              isLoading={loading}
            />
          )}
        </Form.Item>
      </Form>
    </motion.div>
  );
}

export default FormChangePass;
