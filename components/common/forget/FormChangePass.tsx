import React from "react";
import { Form, Input, Typography } from "antd";
import { motion } from "framer-motion";

import { IbuildButton } from "@/components/common";
import { loginApi, resetPassword } from "lib/api/auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../../store/features/auth/auth";
import { validatePassword } from "utils/validate";
import { RulePassword } from "lib/types";
import { rulePassword } from "@/constants/rules";
type Props = {
  onSuccess: () => void;
  email: string;
  code: string;
};

function FormChangePass({ onSuccess, email, code }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [rules, setRules] = useState<RulePassword[]>(rulePassword);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isSamePassword, setIsSamePassword] = useState(false);
  const doLogin = async (cred: { email: string; password: string }) => {
    const data = await loginApi(cred);
    const access_token = data?.access_token;
    if (access_token) {
      dispatch(login(access_token));
    }
  };
  const onSubmit = async (values: any) => {
    setLoading(true);
    console.log(form);

    // isSame = values["newPassword"] ===
    return;
    const params = {
      new_password: values.newPassword,
      email,
      code,
    };
    const res = await resetPassword(params);
    if (res) {
      await doLogin({
        email: email,
        password: values.newPassword,
      });
      onSuccess();
    }
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
        scrollToFirstError
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
        >
          <React.Fragment>
            <Input.Password
              onChange={onChangeValues}
              size="large"
              placeholder="Nhập mật khẩu"
            />
            <div className="password-helper">
              <ul>
                {rules.map((rule) => (
                  <li
                    key={rule.code}
                    className={
                      rule.init ? "" : rule.success ? "success" : "error"
                    }
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
          validateStatus={isSamePassword ? "success" : "error"}
          help={isSamePassword ? undefined : "* Mật khẩu không trùng nhau"}
          label={
            <p>
              Nhập lại mật khẩu <span style={{ color: "#314EAC" }}>*</span>
            </p>
          }
        >
          {() => (
            <Input.Password
              disabled={!isValidPassword}
              size="large"
              placeholder="Nhập mật khẩu"
              onChange={onChangeValuesConfirmPassword}
            />
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
