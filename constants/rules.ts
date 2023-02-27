import { RulePassword } from "lib/types";

export const rulePassword: RulePassword[] = [
  {
    code: "LENGTH",
    message: "Mật khẩu từ 8-20 ký tự",
    pattern: /^(?=.*\w).{8,20}$/,
    init: true,
  },
  {
    code: "LOWERCASE",
    message: "Ký tự thường",
    pattern: /[a-z]/,
    init: true,
  },
  {
    code: "UPPERCASE",
    message: "Ký tự in hoa",
    pattern: /[A-Z]/,
    init: true,
  },
  {
    code: "SPECIALCHAR",
    message: "Ký tự đặc biệt",
    pattern: /[!@#$%^&*()]/,
    init: true,
  },
];
