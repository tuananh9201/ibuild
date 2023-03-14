import { colorPrimary } from "@/constants/colors";
import { rulePassword } from "@/constants/rules";
import { Form, Input, Spin } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "src/lib/api/api";
import { register } from "src/lib/api/auth";
import { RulePassword } from "src/lib/types";
import { login } from "src/store/features/auth/auth";
import { validatePassword } from "src/utils/validate";
import { LoadingOutlined } from "@ant-design/icons";
import RegisterSuccess from "./RegisterSuccess";
import { changeStep } from "src/store/features/auth/register";
type Props = {
  onSuccess: () => void;
};
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const FormRegisterWithEmail = (props: Props) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");
  const [isinitPage, setIsinitPage] = useState(true);
  const [showErrorDiffPassword, setShowErrorDiffPassword] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [rules, setRules] = useState<RulePassword[]>(rulePassword);
  const [isSuccess, setIsSuccess] = useState(false);
  const onFinish = async (values: any) => {
    const credential = {
      email: values.email,
      password,
    };
    if (password !== cPassword) {
      setShowErrorDiffPassword(true);
      return;
    }
    setShowErrorDiffPassword(false);
    setLoadingRegister(true);
    const accessToken = await register(credential);
    if (accessToken) {
      setToken(accessToken);
      dispatch(login(accessToken));
      dispatch(changeStep(3));
      setIsSuccess(true);
    }
    setLoadingRegister(false);
  };
  const onChangeValues = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    const results = validatePassword(value);
    setRules(results);
    const isValid = results.filter((r) => r.success);
    setIsValidPassword(isValid.length === rulePassword.length);
    setIsinitPage(false);
  };

  const onChangeCPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCPassword(value);
    setIsinitPage(value.length === 0);
    if (value.length === 0) {
      setShowErrorDiffPassword(false);
    }
  };
  return isSuccess ? (
    <RegisterSuccess />
  ) : (
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
        label={
          <div>
            {" "}
            Email <span style={{ color: "red" }}>*</span>{" "}
          </div>
        }
        rules={[
          {
            required: true,
            message: "Vui lòng nhập email",
          },
          {
            pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            message: "Email không đúng định dạng",
          },
        ]}
      >
        <Input size="large" placeholder="Nhập email" />
      </Form.Item>
      <Form.Item
        label={
          <div>
            {" "}
            Mật khẩu <span style={{ color: colorPrimary }}>*</span>{" "}
          </div>
        }
        validateStatus={isinitPage ? "" : isValidPassword ? "" : "error"}
      >
        <React.Fragment>
          <Input.Password
            size="large"
            placeholder="Nhập mật khẩu"
            onChange={onChangeValues}
          />
          <div className="password-helper">
            <ul>
              {rules.map((rule) => (
                <li
                  key={rule.code}
                  className={rule.init ? "" : rule.success ? "success" : ""}
                >
                  {rule.message}
                </li>
              ))}
            </ul>
          </div>
        </React.Fragment>
      </Form.Item>
      <Form.Item
        name="confirm"
        label={
          <div>
            {" "}
            Nhập lại mật khẩu <span style={{ color: colorPrimary }}>
              *
            </span>{" "}
          </div>
        }
        rules={[
          {
            required: true,
            message: "Vui lòng nhập mật khẩu",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || password === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("* Mật khẩu không trùng nhau"));
            },
          }),
        ]}
        // validateStatus={showErrorDiffPassword ? "error" : ""}
        // help={
        //   showErrorDiffPassword ? "* Mật khẩu không trùng nhau" : ""
        // }
      >
        <Input.Password
          onChange={onChangeCPassword}
          disabled={!isValidPassword}
          size="large"
          placeholder="Nhập mật khẩu"
        />
      </Form.Item>
      <Form.Item shouldUpdate>
        {() => (
          <div>
            <button
              disabled={
                form.getFieldsError().filter(({ errors }) => errors.length)
                  .length > 0 ||
                loadingRegister ||
                isinitPage ||
                cPassword.length === 0 ||
                !isValidPassword
              }
              className="w-full h-12 text-base font-medium flex justify-center items-center bg-primary-color rounded-lg text-white"
            >
              {loadingRegister ? <Spin indicator={antIcon} /> : "Tạo tài khoản"}
            </button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default FormRegisterWithEmail;
