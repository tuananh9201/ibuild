import { RulePassword } from "src/lib/types";
import { rulePassword } from "../constants/rules";

export const validateEmail = (email: string) => {
  const pattern = /^[\w\s]+([\.-]?[\w\s]+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email.trim());
};
export const validatePassword = (password: string): RulePassword[] => {
  return rulePassword.map((rule) => {
    const result = rule.pattern.test(password);
    return { ...rule, success: result, init: false };
  });
};

export const validPassword = (password: string) => {
  const valids = validatePassword(password);
  return valids.filter((r) => r.success).length === rulePassword.length;
};
const getHeadPhone = (phoneNumber: string) => {
  const HEADS = ["840", "+840", "84", "+84", "0"];
  for (let i = 0; i < HEADS.length; i++) {
    const head = HEADS[i];
    if (head === phoneNumber.substring(0, head.length)) {
      return head;
    }
  }
};
export const validatePhoneNumber = (phoneInput: string): boolean => {
  if (phoneInput.length < 10) return false;
  const pattern = /^(?:\+?1|2|3|4|5|6|7|8|9)(\d{8})$/;
  const headNumber = getHeadPhone(phoneInput);
  if (!headNumber) return false;
  const phoneNumber = phoneInput.substring(
    headNumber.length,
    phoneInput.length
  );
  if (phoneNumber.length !== 9) return false;
  return pattern.test(phoneNumber);
};
export const validateEmailOrPhoneNumber = (emailOrPhoneNumber: string) => {
  const rs = validateEmail(emailOrPhoneNumber);
  if (rs) return rs;
  return validatePhoneNumber(emailOrPhoneNumber);
};
