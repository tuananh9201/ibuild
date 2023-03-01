import { RulePassword } from "lib/types";
import { rulePassword } from "../constants/rules";

export const validatePassword = (password: string): RulePassword[] => {
  return rulePassword.map((rule) => {
    const result = rule.pattern.test(password);
    return { ...rule, success: result, init: false };
  });
};

export const validPassword = (password: string) => {
  const valids = validatePassword(password);
  console.log("valids ", valids);
  return valids.filter((r) => r.success).length === rulePassword.length;
};
