import { Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { rulePassword } from "@/constants/rules";
import { changePasswordByToken } from "@/lib/api/user";
import { RulePassword } from "@/lib/types";
import { validatePassword } from "@/utils/validate";
import { IbuildButton } from "../common";
import { ChangeSuccess } from "@/components/account";

const ChangePassword = () => {
  const [form] = Form.useForm();

  // state
  const [loading, setLoading] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [rules, setRules] = useState<RulePassword[]>(rulePassword);
  const [disabledSubmit, setDisabledSubmit] = useState(true);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [errors, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [changeSuccess, setChangeSuccess] = useState(false);

  // function
  const onFinish = async () => {
    if (password.trim() !== cPassword.trim()) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Mật khẩu không trùng nhau",
      }));
      return;
    }
    setLoading(true);
    const payload = {
      current_password: oldPassword.trim(),
      new_password: password.trim(),
    };
    const res = await changePasswordByToken(payload);
    if (res?.status === 200) {
      setErrors((prev) => ({
        ...prev,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));
      setPassword("");
      setCPassword("");
      setOldPassword("");
      setRules(rulePassword);
      setChangeSuccess(true);
    }
    if (res?.status_code === 400) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "",
        oldPassword: res?.message || "",
      }));
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

  useEffect(() => {
    if (!changeSuccess) return;

    const t = setTimeout(() => {
      setChangeSuccess(false);
    }, 5000);

    return () => {
      clearTimeout(t);
    };
  }, [changeSuccess]);

  return (
    <motion.div
      initial={{ y: 300, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="max-w-[684px]"
    >
      <h2 className="text-[#666666] font-normal text-base text-justify mb-6">
        * Việc thay đổi mật khẩu của bạn sẽ khiến đăng xuất khỏi tất cả các
        thiết bị. Bạn cần phải nhập mật khẩu mới trên tất cả các thiết bị khi
        đăng nhập lại.
      </h2>
      <div className="account-change-password">
        <Form
          onFinish={onFinish}
          form={form}
          scrollToFirstError
          requiredMark={false}
          className="max-w-full"
        >
          <Form.Item
            label={
              <div>
                {" "}
                Mật khẩu cũ <span className="text-red-600">*</span>
              </div>
            }
          >
            <Input.Password
              size="large"
              value={oldPassword}
              placeholder="Nhập mật khẩu"
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <div className="text-[#ff4d4f] text-sm font-medium mt-1">
              {errors.oldPassword ? errors.oldPassword : ""}
            </div>
          </Form.Item>

          <Form.Item
            label={
              <p>
                Mật khẩu mới <span className="text-red-500">*</span>
              </p>
            }
          >
            <React.Fragment>
              <Input.Password
                onChange={onChangeValues}
                value={password}
                size="large"
                placeholder="Nhập mật khẩu"
              />
              <div className="mx-4 mt-2 -mb-2 font-normal text-sm leading-[150%]">
                <ul>
                  {rules.map((rule) => (
                    <li
                      key={rule.code}
                      className={`list-disc ${
                        rule.init ? "" : rule.success ? "text-[#4d993d]" : ""
                      }`}
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
                  value={cPassword}
                  onChange={onChangeValuesConfirmPassword}
                />
                <div className="text-[#ff4d4f] text-sm font-medium mt-1">
                  {errors.confirmPassword ? errors.confirmPassword : ""}
                </div>
              </React.Fragment>
            )}
          </Form.Item>

          <Form.Item shouldUpdate>
            {() => (
              <div className="w-[170px] mr-0 ml-auto">
                <IbuildButton
                  prefix={<span>Đổi mật khẩu</span>}
                  type="submit"
                  disabled={disabledSubmit || loading}
                  isLoading={loading}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </div>
      {changeSuccess && <ChangeSuccess title="Thay đổi thành công" />}
    </motion.div>
  );
};

export default ChangePassword;
